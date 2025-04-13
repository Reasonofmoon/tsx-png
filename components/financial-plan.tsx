import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, DollarSign, Users, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react"

const FinancialPlan = () => {
  // 연도별 매출 및 손익 예측 데이터
  const financialData = [
    {
      year: "1년차",
      매출: 1.2,
      비용: 3.5,
      순이익: -2.3,
      교사수: 1000,
      월평균매칭: 500,
      매출상세: "500건 × 20만원 × 10% = 1,000만원/월",
    },
    {
      year: "2년차",
      매출: 5.76,
      비용: 5.2,
      순이익: 0.56,
      교사수: 3000,
      월평균매칭: 2000,
      매출상세: "2,000건 × 20만원 × 12% = 4,800만원/월",
    },
    {
      year: "3년차",
      매출: 18,
      비용: 7,
      순이익: 11,
      교사수: 8000,
      월평균매칭: 5000,
      매출상세: "5,000건 × 20만원 × 12% + 프리미엄 3천만원 = 1.5억원/월",
    },
  ]

  // 초기 비용 데이터
  const initialCostData = [
    { name: "플랫폼 개발/서버 구축", value: 1.5, color: "#8884d8" },
    { name: "인건비(개발자,마케팅,운영)", value: 4, color: "#82ca9d" },
    { name: "마케팅 비용", value: 0.8, color: "#ffc658" },
    { name: "사무실 임대/운영비", value: 0.6, color: "#ff8042" },
  ]

  // 자금 조달 계획 데이터
  const fundingData = [
    { name: "정부지원사업", percentage: 40, description: "여성창업 경진대회, 중기부 R&D, 고용노동부" },
    { name: "엔젤투자", percentage: 35, description: "초기 시드 투자를 통한 개발비, 마케팅비 확보" },
    { name: "크라우드펀딩", percentage: 15, description: "플랫폼 시범 운영 이후 대중 투자 유도" },
    { name: "자체 매출", percentage: 10, description: "본격적인 매칭 서비스 론칭 후 수수료" },
  ]

  // 손익분기점 도달 그래프 데이터
  const bepData = [
    {
      month: "6개월",
      수익: 0.6,
      비용: 1.8,
      누적손익: -1.2,
    },
    {
      month: "12개월",
      수익: 1.2,
      비용: 3.5,
      누적손익: -2.3,
    },
    {
      month: "18개월",
      수익: 3,
      비용: 4.2,
      누적손익: -1.2,
    },
    {
      month: "24개월",
      수익: 5.76,
      비용: 5.2,
      누적손익: 0.56,
    },
    {
      month: "30개월",
      수익: 9,
      비용: 6,
      누적손익: 3,
    },
    {
      month: "36개월",
      수익: 18,
      비용: 7,
      누적손익: 11,
    },
  ]

  // 월별 운영비 데이터
  const monthlyOperationCostData = [
    { name: "인건비", value: 4.5, color: "#8884d8" },
    { name: "서버/유지보수/보안", value: 0.4, color: "#82ca9d" },
    { name: "교사 교육 프로그램", value: 0.25, color: "#ffc658" },
    { name: "마케팅/프로모션", value: 1.5, color: "#ff8042" },
    { name: "기타 운영비", value: 0.35, color: "#0088FE" },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">재무 계획 및 수익 성장 전략</h1>
        <p className="text-lg text-gray-600">3년 내 손익분기점 달성을 위한 재무 로드맵</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <DollarSign className="mr-2 text-green-600" size={24} />
            <span>초기 비용 (1년차)</span>
          </h2>
          <div className="bg-white rounded-lg p-4 shadow-sm h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={initialCostData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit="억원" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value} 억원`, "금액"]} />
                <Bar dataKey="value" name="금액(억원)">
                  {initialCostData.map((entry, index) => (
                    <Bar key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-blue-600" size={24} />
            <span>연간 운영비 (추정)</span>
          </h2>
          <div className="bg-white rounded-lg p-4 shadow-sm h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyOperationCostData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 110, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit="억원" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value} 억원`, "금액"]} />
                <Bar dataKey="value" name="금액(억원)">
                  {monthlyOperationCostData.map((entry, index) => (
                    <Bar key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="mr-2 text-purple-600" size={24} />
          <span>매출 추정 및 손익분기점 시나리오</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연차</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  교사 수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  월 평균 매칭
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  매출 상세
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연 매출(억원)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  순이익(억원)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {financialData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.교사수.toLocaleString()}명
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.월평균매칭.toLocaleString()}건
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.매출상세}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.매출.toFixed(2)}억</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${item.순이익 < 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    {item.순이익.toFixed(2)}억
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.순이익 < 0 ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        적자
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        흑자
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <span>손익분기점(BEP) 달성 그래프</span>
        </h2>
        <div className="bg-white rounded-lg p-4 shadow-sm h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bepData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="수익" stroke="#82ca9d" name="누적 수익(억원)" strokeWidth={2} />
              <Line type="monotone" dataKey="비용" stroke="#ff7300" name="누적 비용(억원)" strokeWidth={2} />
              <Line type="monotone" dataKey="누적손익" stroke="#8884d8" name="누적 손익(억원)" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-center text-gray-500">예상 손익분기점: 운영 24개월 차(2년) 달성 전망</div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="mr-2 text-indigo-600" size={24} />
          <span>자금조달 계획</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              {fundingData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="text-gray-900 font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">자금 조달 핵심 전략</h3>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-800">
                  <ArrowUpRight size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">정부지원사업 적극 활용</p>
                  <p className="text-sm text-gray-500">여성기업종합지원센터, 중기부 R&D, 고용노동부</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <ArrowUpRight size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">엔젤투자 유치</p>
                  <p className="text-sm text-gray-500">여성 창업, 교육, 사회적 가치 관심 투자자 중심</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-800">
                  <ArrowUpRight size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">크라우드펀딩</p>
                  <p className="text-sm text-gray-500">교육 안전성과 여성 일자리에 관심있는 대중 투자</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-amber-100 text-amber-800">
                  <ArrowDownRight size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">단계적 비용 투자</p>
                  <p className="text-sm text-gray-500">MVP 출시 후 성과에 따라 마케팅 비용 단계적 투입</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancialPlan
