"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { transform } from "@babel/standalone"
import React from "react"
import * as LucideIcons from "lucide-react"
import { createMockRecharts, createIconProxy } from "./mock-components"

interface CodePreviewProps {
  code: string
  onError?: (error: string) => void
}

export default function CodePreview({ code, onError }: CodePreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code) return

    try {
      // 안전한 오류 처리를 위한 래퍼 함수
      const safeRender = () => {
        try {
          // 임포트 문 제거
          let processedCode = code
            .replace(/import\s+.*?from\s+['"].*?['"];?/g, "")
            .replace(/import\s+{.*?}\s+from\s+['"].*?['"];?/g, "")
            .replace(/import\s+['"].*?['"];?/g, "")

          // 내보내기 문 처리
          processedCode = processedCode
            // 기본 내보내기 처리
            .replace(/export\s+default\s+function\s+(\w+)/g, "function $1")
            .replace(/export\s+default\s+class\s+(\w+)/g, "class $1")
            .replace(/export\s+default\s+(\w+)/g, "const ExportedComponent = $1")
            // 명명된 내보내기 처리
            .replace(/export\s+function\s+(\w+)/g, "function $1")
            .replace(/export\s+class\s+(\w+)/g, "class $1")
            .replace(/export\s+const\s+(\w+)/g, "const $1")
            .replace(/export\s+let\s+(\w+)/g, "let $1")
            .replace(/export\s+var\s+(\w+)/g, "var $1")
            // 내보내기 문 처리
            .replace(/export\s+{(.*?)}/g, "/* exports: $1 */")
            // 독립 실행형 기본 내보내기 문 처리
            .replace(/export\s+default\s+/g, "const ExportedComponent = ")

          // 안전한 변환을 위한 추가 오류 처리
          let transformedCode
          try {
            // Babel을 사용하여 TSX를 JS로 변환
            transformedCode = transform(processedCode, {
              filename: "component.tsx",
              presets: ["react", "typescript"],
              parserOpts: {
                // 더 관대한 구문 분석 옵션
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true,
                allowImportExportEverywhere: true,
                allowSuperOutsideMethod: true,
                allowUndeclaredExports: true,
                errorRecovery: true,
              },
            }).code
          } catch (transformError) {
            console.error("Babel 변환 오류:", transformError)
            throw new Error(`코드 변환 오류: ${transformError.message || "알 수 없는 오류"}`)
          }

          // 컴포넌트를 반환하는 함수 생성
          const createComponentFn = new Function(
            "React",
            "LucideIcons",
            "createMockRecharts",
            "createIconProxy",
            `
            try {
              // React 임포트 모의
              const { useState, useEffect, useRef, useCallback, useMemo, useContext } = React;
              
              // Lucide 아이콘 프록시 생성
              const iconProxy = createIconProxy(LucideIcons);
              
              // 모든 Lucide 아이콘을 전역 변수로 설정
              // 이렇게 하면 코드에서 직접 아이콘 이름을 참조할 수 있음
              const {
                Users, User, UserCheck, Building, ArrowUpRight, ArrowDownRight, 
                CircleCheck, Coins, Heart, Shield, TrendingUp, Clock, 
                BarChart2, DollarSign, FileText, Check, ChevronsUpDown, 
                Search, File, X, FileUp, Code, Eye, FileDown, AlertTriangle, 
                Wand2, Lightbulb, ChevronRight, Settings, Printer, FileImage,
                RefreshCw, Loader2, CreditCard
              } = iconProxy;
              
              // 추가 안전 장치: 모든 Lucide 아이콘에 대한 전역 접근 제공
              // 이렇게 하면 위에서 명시적으로 나열되지 않은 아이콘도 사용 가능
              Object.keys(LucideIcons).forEach(iconName => {
                if (typeof window !== 'undefined' && !window[iconName]) {
                  window[iconName] = iconProxy[iconName];
                }
                if (typeof global !== 'undefined' && !global[iconName]) {
                  global[iconName] = iconProxy[iconName];
                }
                // 함수 스코프에서도 아이콘 사용 가능하게 함
                if (typeof this !== 'undefined' && !this[iconName]) {
                  this[iconName] = iconProxy[iconName];
                }
              });
              
              // Recharts 컴포넌트 모의
              const {
                BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
                ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
                PolarRadiusAxis, Radar, LineChart, Line
              } = createMockRecharts();
              
              // 안전한 평가를 위해 try-catch로 코드 래핑
              try {
                ${transformedCode}
                
                // 컴포넌트 내보내기 찾기
                return React.createElement(
                  typeof ExportedComponent !== 'undefined' 
                    ? ExportedComponent 
                    : (typeof default_1 !== 'undefined' 
                      ? default_1 
                      : (typeof ExampleComponent !== 'undefined' 
                        ? ExampleComponent 
                        : (typeof Component !== 'undefined' 
                          ? Component 
                          : (typeof MarketAnalysis !== 'undefined'
                            ? MarketAnalysis
                            : (typeof BusinessOverview !== 'undefined'
                              ? BusinessOverview
                              : (typeof FinancialPlan !== 'undefined'
                                ? FinancialPlan
                                : (typeof BusinessDashboard !== 'undefined'
                                  ? BusinessDashboard
                                  : (() => React.createElement('div', null, 'No component found'))
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                );
              } catch (evalError) {
                console.error("코드 평가 오류:", evalError);
                return React.createElement('div', null, 
                  React.createElement('p', {style: {color: 'red'}}, '컴포넌트 렌더링 오류: ' + evalError.message)
                );
              }
            } catch (outerError) {
              console.error("외부 오류:", outerError);
              return React.createElement('div', null, 
                React.createElement('p', {style: {color: 'red'}}, '컴포넌트 생성 오류: ' + outerError.message)
              );
            }
            `,
          )

          // 함수 실행 및 오류 처리
          try {
            return createComponentFn(React, LucideIcons, createMockRecharts, createIconProxy)
          } catch (executionError) {
            console.error("함수 실행 오류:", executionError)
            throw new Error(`컴포넌트 실행 오류: ${executionError.message || "알 수 없는 오류"}`)
          }
        } catch (innerError) {
          console.error("내부 렌더링 오류:", innerError)
          throw innerError
        }
      }

      // 안전한 렌더링 시도
      const ComponentToRender = safeRender()
      setComponent(() => () => ComponentToRender)
      setError(null)

      // 오류 콜백 초기화
      if (onError) {
        onError(null)
      }
    } catch (err) {
      console.error("컴포넌트 렌더링 오류:", err)
      const errorMessage = err instanceof Error ? err.message : "컴포넌트 렌더링 실패"
      setError(errorMessage)

      if (onError) {
        onError(errorMessage)
      }

      // 오류를 표시하는 대체 컴포넌트 생성
      setComponent(() => () => (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md">
          <h3 className="text-red-600 font-medium">컴포넌트 렌더링 오류:</h3>
          <pre className="mt-2 text-sm overflow-auto whitespace-pre-wrap">{errorMessage}</pre>
        </div>
      ))
    }
  }, [code, onError])

  // 오류 상태 처리
  if (error && !Component) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <p className="font-semibold">컴포넌트 렌더링 오류:</p>
          <p className="text-sm">{error}</p>
        </AlertDescription>
      </Alert>
    )
  }

  // 안전한 렌더링을 위한 오류 경계
  try {
    return (
      <div className="preview-container dynamic-content">
        {Component ? <Component /> : <div className="text-center py-4">컴포넌트 로딩 중...</div>}
      </div>
    )
  } catch (renderError) {
    console.error("최종 렌더링 오류:", renderError)
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <p className="font-semibold">렌더링 중 오류 발생:</p>
          <p className="text-sm">{renderError instanceof Error ? renderError.message : "알 수 없는 오류"}</p>
        </AlertDescription>
      </Alert>
    )
  }
}
