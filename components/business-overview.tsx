import { FileCheck, Users, Coins, Heart } from "lucide-react"

const BusinessOverview = () => {
  const coreValues = [
    {
      icon: <FileCheck size={48} className="text-pink-600" />,
      title: "신뢰도",
      description: "교사 범죄이력 조회·대면 면접·성인지 교육 필수",
      color: "bg-pink-100",
    },
    {
      icon: <Users size={48} className="text-blue-600" />,
      title: "전문성",
      description: "교수법 교육, 교사 역량 평가, 정기 피드백",
      color: "bg-blue-100",
    },
    {
      icon: <Coins size={48} className="text-amber-600" />,
      title: "공정성",
      description: "합리적인 중개 수수료, 투명한 결제∙정산 시스템",
      color: "bg-amber-100",
    },
    {
      icon: <Heart size={48} className="text-green-600" />,
      title: "사회공헌",
      description: "저소득층∙다문화∙새터민∙한부모 가정 학생 지원",
      color: "bg-green-100",
    },
  ]

  const goals = [
    "안전하고 신뢰도 높은 1:1 과외 서비스 제공",
    "고학력 경력단절여성 및 전문 여성 교사에게 안정적 일자리 창출",
    "음성 사교육 시장 양성화, 교육 사각지대 해소",
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">여성 교사 전용 과외 매칭 플랫폼</h1>
        <p className="text-lg text-gray-600">안전하고 전문적인 교육 서비스와 여성 일자리 창출의 조화</p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">핵심 목표</h2>
        <div className="bg-purple-50 rounded-lg p-6 shadow-sm">
          <ul className="space-y-3">
            {goals.map((goal, index) => (
              <li key={index} className="flex items-center">
                <div className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">핵심 가치</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coreValues.map((value, index) => (
          <div key={index} className={`${value.color} rounded-lg p-6 shadow-sm transition-transform hover:scale-105`}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">실현가능성 요약</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md font-medium mr-3 w-32 text-center flex-shrink-0">
              자금조달
            </div>
            <div className="text-gray-700">정부 지원사업(여성기업종합지원센터, 중기부) + 엔젤투자</div>
          </div>
          <div className="flex">
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md font-medium mr-3 w-32 text-center flex-shrink-0">
              수익 모델
            </div>
            <div className="text-gray-700">과외 중개 수수료 + 프리미엄 서비스/컨설팅 + 기업∙공공기관 CSR 협업</div>
          </div>
          <div className="flex">
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md font-medium mr-3 w-32 text-center flex-shrink-0">
              BEP 달성
            </div>
            <div className="text-gray-700">
              3년 내 손익분기점 달성, 1~2년 차 집중 마케팅 후 가입자 확보, 3년 차부터 안정적인 흑자 전환 전망
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessOverview
