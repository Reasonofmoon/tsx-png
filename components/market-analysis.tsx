import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { ArrowUpRight, Users, UserCheck, Building } from "lucide-react"

const MarketAnalysis = () => {
  // 사교육 시장 규모 데이터 - 가상 데이터
  const marketSizeData = [
    { year: "2020", 규모: 20 },
    { year: "2021", 규모: 21 },
    { year: "2022", 규모: 23 },
    { year: "2023", 규모: 24 },
    { year: "2024", 규모: 26 },
    { year: "2025", 규모: 28 },
  ]

  // 경쟁사 분석 레이더 차트 데이터
  const competitorData = [
    {
      subject: "신뢰도",
      "여성교사 플랫폼": 90,
      김과외: 60,
      숨고: 50,
      동화세상에듀코: 85,
    },
    {
      subject: "전문성",
      "여성교사 플랫폼": 85,
      김과외: 70,
      숨고: 60,
      동화세상에듀코: 80,
    },
    {
      subject: "가격 경쟁력",
      "여성교사 플랫폼": 75,
      김과외: 85,
      숨고: 80,
      동화세상에듀코: 65,
    },
    {
      subject: "이용 편의성",
      "여성교사 플랫폼": 80,
      김과외: 75,
      숨고: 85,
      동화세상에듀코: 70,
    },
    {
      subject: "사회적 가치",
      "여성교사 플랫폼": 95,
      김과외: 50,
      숨고: 45,
      동화세상에듀코: 70,
    },
  ]

  // 목표 세분화 데이터
  const segmentationData = [
    {
      icon: <Users size={36} className="text-purple-600" />,
      title: "학부모/학생",
      items: [
        "안전성을 중시하는 가정",
        "전문성과 검증된 교사를 원하는 초·중·고, 재수생",
        "여성 교사를 선호하는 학부모",
      ],
      color: "bg-purple-50 border-purple-200",
    },
    {
      icon: <UserCheck size={36} className="text-teal-600" />,
      title: "교사풀(공급자)",
      items: ["경력단절여성", "전문 여성강사", "교직 이수 중인 여성 대학생"],
      color: "bg-teal-50 border-teal-200",
    },
    {
      icon: <Building size={36} className="text-blue-600" />,
      title: "협력기관",
      items: ["여성지원 관련 정부/지자체", "교육 CSR에 관심있는 기업", "교육 관련 공공기관"],
      color: "bg-blue-50 border-blue-200",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">시장 분석 및 경쟁 동향</h1>
        <p className="text-lg text-gray-600">여성 교사 전용 과외 매칭 플랫폼의 시장 기회</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <span>국내 사교육 시장 규모</span>
          <ArrowUpRight className="ml-2 text-green-600" size={20} />
        </h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketSizeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: "조원", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="규모" fill="#8884d8" name="사교육 시장규모(조원)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            국내 사교육 시장은 지속적으로 성장하는 추세입니다. (가상 데이터)
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">경쟁 동향 분석</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={competitorData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="여성교사 플랫폼"
                  dataKey="여성교사 플랫폼"
                  stroke="#FF6384"
                  fill="#FF6384"
                  fillOpacity={0.6}
                />
                <Radar name="김과외" dataKey="김과외" stroke="#36A2EB" fill="#36A2EB" fillOpacity={0.6} />
                <Radar name="숨고" dataKey="숨고" stroke="#FFCE56" fill="#FFCE56" fillOpacity={0.6} />
                <Radar
                  name="동화세상에듀코"
                  dataKey="동화세상에듀코"
                  stroke="#4BC0C0"
                  fill="#4BC0C0"
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            경쟁사 대비 우리 플랫폼의 주요 강점은 신뢰도와 사회적 가치입니다.
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">목표 세분화</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {segmentationData.map((segment, index) => (
            <div key={index} className={`${segment.color} border rounded-lg p-6 shadow-sm`}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{segment.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{segment.title}</h3>
                <ul className="text-left space-y-2">
                  {segment.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-gray-900 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">차별화 전략</h2>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center py-2 border-b border-gray-200">
            <div className="font-medium text-gray-900 w-full md:w-1/4 mb-2 md:mb-0">여성 교사 전용</div>
            <div className="text-gray-700 w-full md:w-3/4">철저한 신원검증과 안전성 강조를 통한 특화 플랫폼</div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center py-2 border-b border-gray-200">
            <div className="font-medium text-gray-900 w-full md:w-1/4 mb-2 md:mb-0">대면 검증</div>
            <div className="text-gray-700 w-full md:w-3/4">모든 교사 면대면 인터뷰 및 검증 과정 의무화</div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center py-2 border-b border-gray-200">
            <div className="font-medium text-gray-900 w-full md:w-1/4 mb-2 md:mb-0">성인지 교육</div>
            <div className="text-gray-700 w-full md:w-3/4">교사 대상 성인지 및 교육 윤리 관련 필수 교육 프로그램</div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center py-2">
            <div className="font-medium text-gray-900 w-full md:w-1/4 mb-2 md:mb-0">역량 강화</div>
            <div className="text-gray-700 w-full md:w-3/4">
              중·고급 교사 역량 강화 프로그램을 통한 지속적인 교육 품질 관리
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketAnalysis
