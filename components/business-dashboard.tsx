"use client"

import { useState } from "react"
import { ChevronRight, BarChart2, Users, Heart, Shield, TrendingUp, Clock } from "lucide-react"
import React from 'react'

interface DashboardTabProps {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}

const DashboardTab = ({ icon, title, active, onClick }: DashboardTabProps) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${
        active ? "bg-purple-100 text-purple-800 border-l-4 border-purple-600" : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span className={`${active ? "font-semibold" : "font-medium"}`}>{title}</span>
      {active && <ChevronRight className="ml-auto" size={18} />}
    </div>
  )
}

const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", title: "사업 개요", icon: <BarChart2 size={20} /> },
    { id: "market", title: "시장 분석", icon: <TrendingUp size={20} /> },
    { id: "service", title: "서비스 프로세스", icon: <Clock size={20} /> },
    { id: "financial", title: "재무 계획", icon: <BarChart2 size={20} /> },
    { id: "risk", title: "리스크 및 사회적 기여", icon: <Shield size={20} /> },
  ]

  // 핵심 인사이트 데이터
  const keyInsights = [
    {
      title: "안전성 강조",
      description: "교사 범죄이력 조회와 대면 면접을 통한 신뢰도 확보가 핵심 경쟁력",
      color: "bg-red-50 border-red-200",
    },
    {
      title: "시장 니즈",
      description: "안전한 여성 교사에 대한 수요 증가, 특히 초중고 및 여학생 대상 시장 확대",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "경력단절 해소",
      description: "고학력 경력단절여성들의 전문성을 살린 일자리 창출 기여",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "3년 내 BEP",
      description: "교사 8,000명, 월 5,000건 매칭 시 안정적 수익 구조 확립 가능",
      color: "bg-amber-50 border-amber-200",
    },
  ]

  // KPI 데이터
  const kpiData = [
    {
      title: "교사 모집",
      current: "1,000명",
      target: "8,000명",
      progress: 12.5,
      color: "bg-purple-600",
    },
    {
      title: "월 매칭 건수",
      current: "500건",
      target: "5,000건",
      progress: 10,
      color: "bg-blue-600",
    },
    {
      title: "월 매출",
      current: "1,000만원",
      target: "1.5억원",
      progress: 6.7,
      color: "bg-green-600",
    },
    {
      title: "취약계층 지원",
      current: "50건",
      target: "500건",
      progress: 10,
      color: "bg-pink-600",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">여성 교사 전용 과외 매칭 플랫폼</h1>
        <p className="text-lg text-gray-600">안전하고 전문적인 교육 서비스와 여성 일자리 창출의 조화</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">사업 요약</h2>
          <p className="text-gray-700">
            본 플랫폼은 <span className="font-semibold text-purple-700">안전성(성범죄∙사기 예방)</span>,
            <span className="font-semibold text-blue-700">투명성(탈세∙분쟁 방지)</span>,
            <span className="font-semibold text-green-700">여성 고용 창출</span>,
            <span className="font-semibold text-pink-700">사회공헌</span>을 중심 가치로 삼아, 국내 과외 시장의 구조적
            문제를 해결합니다. 1~2년 내 회원·매출 기반을 구축하고, 3년 차부터 안정적 흑자 달성을 목표로 합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {keyInsights.map((insight, index) => (
          <div key={index} className={`border rounded-lg p-6 shadow-sm ${insight.color}`}>
            <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
            <p className="text-gray-700">{insight.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 bg-purple-50 border-b border-purple-100">
            <h2 className="text-xl font-semibold text-gray-800">메뉴</h2>
          </div>
          <div className="divide-y">
            {tabs.map((tab) => (
              <DashboardTab
                key={tab.id}
                icon={tab.icon}
                title={tab.title}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">핵심 성과 지표 (KPI)</h2>
            <div className="space-y-6">
              {kpiData.map((kpi, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-medium">{kpi.title}</span>
                    <div className="text-gray-700">
                      <span className="font-semibold">{kpi.current}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span>{kpi.target}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${kpi.color} h-2.5 rounded-full`} style={{ width: `${kpi.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Users className="text-purple-600 mr-3" size={24} />
                <h3 className="text-lg font-semibold">핵심 목표 그룹</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span className="text-gray-700">안전성을 중시하는 학부모/학생</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span className="text-gray-700">경력단절 전문 여성교사/강사</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span className="text-gray-700">교육 CSR에 관심있는 기업/기관</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Heart className="text-pink-600 mr-3" size={24} />
                <h3 className="text-lg font-semibold">사회적 가치</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-pink-100 text-pink-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span className="text-gray-700">교육 안전성 강화 및 신뢰 구축</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-pink-100 text-pink-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span className="text-gray-700">여성 고용 확대 및 경력유지 지원</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-pink-100 text-pink-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span className="text-gray-700">교육 취약계층 지원 및 기회 평등</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">결론</h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            본 플랫폼은 신원이 검증된 여성 교사만을 선별하여 안전한 교육 환경을 제공하는 동시에, 경력단절 여성에게
            전문성을 살린 양질의 일자리를 창출합니다. 공정하고 투명한 중개 시스템으로 음성 사교육 시장을 양성화하고,
            취약계층 학생들에게 교육 기회를 확대하는 사회적 가치도 실현합니다.
          </p>
          <p>
            철저한 교사 검증 과정과 교육 프로그램을 통해 서비스 품질을 유지하고, 단계적인 확장 전략으로 3년 내
            손익분기점 달성을 목표로 합니다. 정부 지원사업과 투자 유치를 통해 초기 자금을 확보하고, 차별화된 서비스로
            시장에서의 경쟁력을 갖출 것입니다.
          </p>
          <p>
            여성의 사회 참여와 교육의 안전성이라는 두 가지 중요한 사회적 과제를 해결하는 이 플랫폼은, 수익성과 사회적
            가치를 동시에 추구하는 지속 가능한 비즈니스 모델로 성장해 나갈 것입니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BusinessDashboard
