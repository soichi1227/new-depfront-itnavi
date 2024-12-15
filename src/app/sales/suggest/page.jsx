"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BusinessMeetingAdvice = () => {
  const [meetingData, setMeetingData] = useState(null);
  const router = useRouter();

  // ダミーデータ
  const defaultMeetingData = {
    id: 1,
    date: "2024-12-10 10:00",
    company: "株式会社A",
    department: "営業部",
    position: "部長",
    representative: "田中 太郎",
    industry: "IT",
    revenue: "50億円",
    survey1: "①基幹システム、業務システム周辺の課題",
    survey2: "ベンダーコントロールが上手くいっておらず、イニシアティブを取られている",
    businessDetails:
      "環境衛生用品のレンタルプロのお掃除、家事代行、害虫駆除など多彩なクリーンサービスを提供し、『ミスタードーナツ』を中心とした飲食事業も展開しています。また、高齢化社会に対応した介護用品のレンタル・販売やシニア向けサービスも充実。独自のフランチャイズシステムで加盟店と理念を共有し、信頼関係を構築。使用済み商品の再利用や再資源化など環境配慮にも注力し、持続可能な社会の実現に貢献しています。",
  };

  // アンケート項目の状態
  const [surveyOptions, setSurveyOptions] = useState({
    survey1: [],
    survey2: [],
  });

  // 業界と売上規模に基づくアンケート選択肢を設定
  useEffect(() => {
    const fetchSurveyOptions = () => {
      // ダミーデータ: 業界と売上規模に応じた選択肢
      const options = {
        IT: {
          "50億円": {
            survey1: [
              "基幹システムの改善",
              "データ管理の効率化",
              "セキュリティ対策の強化",
            ],
            survey2: [
              "外部ベンダーの活用",
              "クラウド移行の検討",
              "新規ソフトウェア導入",
            ],
          },
        },
        製造: {
          "100億円": {
            survey1: [
              "生産ラインの自動化",
              "在庫管理の最適化",
              "物流システムの改善",
            ],
            survey2: [
              "新しい製造設備の導入",
              "コスト削減の提案",
              "サプライチェーンの改善",
            ],
          },
        },
      };

      // 業界と売上規模に基づいて選択肢を取得
      const industryOptions = options[meetingData?.industry]?.[meetingData?.revenue] || {
        survey1: ["該当データなし"],
        survey2: ["該当データなし"],
      };

      setSurveyOptions(industryOptions);
    };

    fetchSurveyOptions();
  }, [meetingData]);

  useEffect(() => {
    const savedDeal = localStorage.getItem("selectedDeal");
    if (savedDeal) {
      setMeetingData(JSON.parse(savedDeal));
    } else {
      setMeetingData(defaultMeetingData); // Fallback to default data if none is found
    }
  }, []);

  if (!meetingData) {
    return <p>データを読み込んでいます...</p>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f9f9f9" }}>
      {/* ヘッダー */}
      <h1 style={{ color: "#1E90FF", textAlign: "left", fontSize: "24px", marginBottom: "20px" }}>IT Trip Navigator</h1>

      {/* 商談アドバイス タイトル */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>商談アドバイス</h2>

      {/* テーブル */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
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
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.id}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.selected_date_time}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.company_name}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.department}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.role_name}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.sales_rep_name}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.industry}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.revenue}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.survey1_selected}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.survey1_priority_item}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meetingData.survey2_selected}</td>
          </tr>
        </tbody>
      </table>

      {/* 会社詳細 */}
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: "5px" }}>
        <h3 style={{ marginBottom: "10px" }}>〇〇社の事業について</h3>
        <p style={{ margin: 0 }}>{meetingData.businessDetails}</p>
      </div>

      {/* アンケートエリア */}
      <div style={{ marginBottom: "20px" }}>
        <h3>アンケート①</h3>
        <ul>
          {surveyOptions.survey1.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
        <h3>アンケート②</h3>
        <ul>
          {surveyOptions.survey2.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>

      {/* 顧客課題の考察と提案シナリオ */}
      <div style={{ padding: "10px", backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: "5px" }}>
        <h3>顧客課題の考察と提案シナリオ</h3>
        <p style={{ margin: 0 }}>ここに提案内容を記載</p>
      </div>

      {/* 商談選択へ戻るボタン */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          onClick={() => router.push("/")}
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
          商談選択へ戻る
        </button>
      </div>
    </div>
  );
};

export default BusinessMeetingAdvice;

