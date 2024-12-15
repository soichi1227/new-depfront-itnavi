"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SalesManagement = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const router = useRouter();

  const fetchDeals = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/manage_deals"); // API URLを指定
      const data = await response.json();
      setDeals(data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleGeneratePreparation = () => {
    if (!selectedDeal) {
      alert("商談を選択してください。");
      return;
    }
    const selectedData = deals.find((deal) => deal.id === selectedDeal);
    localStorage.setItem("selectedDeal", JSON.stringify(selectedData));
    router.push("/sales/suggest");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* サービス名 */}
      <h1 style={{ color: "#1E90FF", fontSize: "24px", marginBottom: "10px" }}>ITtripNavigator</h1>

      {/* 商談管理画面タイトル */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>商談管理画面</h2>

      {/* スクロール可能なテーブルラッパー */}
      <div style={{ overflowY: "auto", maxHeight: "900px", border: "1px solid #ddd" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", position: "sticky", top: 0, zIndex: 1 }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>選択</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>商談ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>商談日時</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>企業名</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>部署名</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>役職</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>担当者名</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>業種業界</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>売上規模</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>アンケート①</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>アンケート①優先度１</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>アンケート②</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr
                key={deal.id}
                style={{
                  backgroundColor: selectedDeal === deal.id ? "#FFFF99" : "transparent",
                }}
              >
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <input
                    type="radio"
                    name="selectedDeal"
                    value={deal.id}
                    checked={selectedDeal === deal.id}
                    onChange={() => setSelectedDeal(deal.id)}
                  />
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.id}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.selected_date_time}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.company_name}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.department}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.role_name}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.sales_rep_name}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.industry}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.revenue}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.survey1_selected_items}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.survey1_selected_items}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{deal.survey2_selected_items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 商談準備を生成ボタン */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleGeneratePreparation}
          style={{
            backgroundColor: "#1E90FF",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          商談準備を生成
        </button>
      </div>
    </div>
  );
};

export default SalesManagement;
