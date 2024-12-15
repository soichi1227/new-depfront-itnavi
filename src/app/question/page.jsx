"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ITTripNavigator = () => {
  const SearchParams = useSearchParams();
  const industry = SearchParams.get('industry');
  const revenue = SearchParams.get('revenue');
  //console.log(revenue); 
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [priorities, setPriorities] = useState({});

  // Base URL from environment variables
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  // Flask APIから設問データを取得
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/survey_items?industry=${encodeURIComponent(
            industry
          )}&revenue=${encodeURIComponent(revenue)}`
        );
        if (!response.ok) throw new Error("設問データの取得に失敗しました");
        const data = await response.json();
        console.log(data[0].id)
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [industry, revenue, API_BASE_URL]);

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;

    if (isChecked && selectedCount < 3) {
      setSelectedCount(selectedCount + 1);
      setPriorities((prevPriorities) => {
        const usedPriorities = Object.values(prevPriorities);
        const newPriority = [1, 2, 3].find((p) => !usedPriorities.includes(p));
        return { ...prevPriorities, [index]: newPriority };
      });
    } else if (!isChecked) {
      setSelectedCount(selectedCount - 1);
      setPriorities((prevPriorities) => {
        const updatedPriorities = { ...prevPriorities };
        delete updatedPriorities[index];
        const sortedEntries = Object.entries(updatedPriorities).sort(
          ([, a], [, b]) => a - b
        );
        const reorderedPriorities = {};
        sortedEntries.forEach(([key], i) => {
          reorderedPriorities[key] = i + 1;
        });
        return reorderedPriorities;
      });
    } else {
      event.target.checked = false;
      alert("選択肢は最大3つまでです。");
    }
  };

  const navigateToNextPage = (e) => {
    e.preventDefault();

    const priority1 = Object.keys(priorities).find(
      (key) => priorities[key] === 1
    );

    if (priority1) {
      const selectedOption = questions[priority1]?.question || "";
      localStorage.setItem("priority1", selectedOption);
    }

    router.push("/question2");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold">
              <span className="text-[#1BB0E7]">IT </span>
              <span className="text-gray-700">Trip </span>
              <span className="text-[#1BB0E7]">Navigator</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 relative">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">商談前アンケート</h1>
          
        <p className="text-center mb-12 text-gray-600">
          商談の場で、貴社にとって有益な情報をお伝えさせてください
        </p>

        {isLoading ? (
          <p className="text-center">設問を読み込み中...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Q. 現在取り組んでいる、または、1年以内に解決したいIT課題はなんですか？
              </h2>
              <p className="text-gray-600">
                優先度の高い課題から順に最大3つ選択ください。
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((item) => (
                <label key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer">
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                    disabled={!selectedItems.includes(item.id) && selectedItems.length >= 3}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="flex items-center">
                      <span className="text-gray-700">{item.question}</span>
                      {priorities[item.id] && (
                        <span className="priority-badge ml-2 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-sm">
                          優先度 {priorities[item.id]}
                        </span>
                      )}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-8 pb-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
          <Button 
            className="px-8 py-2 bg-[#1BB0E7] hover:bg-[#1690c0] transition-colors duration-150 ease-in-out"
            onClick={navigateToNextPage}
            disabled={selectedItems.length === 0}
          >
            次へ
          </Button>
          <Link 
            href="/consultation/select" 
            className="text-gray-600 hover:text-gray-800 text-sm underline"
          >
            商談日時選択に戻る
          </Link>
        </div>
      </footer>

      <style jsx>{`
        .priority-badge {
          transition: all 0.3s ease;
        }
        .priority-badge:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}

export default ITTripNavigator;
