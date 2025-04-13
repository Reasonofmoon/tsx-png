/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 내보내기 옵션 추가
  output: 'standalone',
  
  // 실험적 기능 활성화
  experimental: {
    // 앱 라우터에서 서버 컴포넌트 사용
    serverComponents: true,
    // 클라이언트 컴포넌트 사용
    serverActions: true,
  },
  
  // 웹팩 구성 추가
  webpack: (config, { isServer }) => {
    // 클라이언트 측에서만 적용
    if (!isServer) {
      // babel-standalone을 외부 모듈로 처리
      config.externals = [...(config.externals || []), { '@babel/standalone': 'babel' }]
    }
    
    return config
  },
}

export default nextConfig
