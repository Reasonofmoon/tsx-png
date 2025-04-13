import React from "react"

// Recharts 컴포넌트 모의 생성
export const createMockRecharts = () => {
  // 기본 모의 컴포넌트 팩토리 생성
  const createMockComponent = (name) => (props) => {
    try {
      return React.createElement(
        "div",
        {
          className: "mock-recharts-component",
          style: {
            padding: "20px",
            border: "1px dashed #ccc",
            borderRadius: "4px",
            margin: "10px 0",
            textAlign: "center",
            color: "#666",
          },
        },
        [
          React.createElement("div", { key: "title", style: { fontWeight: "bold" } }, name),
          React.createElement("div", { key: "children" }, props.children || "Chart Placeholder"),
        ],
      )
    } catch (error) {
      console.error(`Error creating mock component ${name}:`, error)
      return React.createElement(
        "div",
        { style: { color: "red", padding: "10px", border: "1px solid red" } },
        `Error rendering ${name}`,
      )
    }
  }

  // 모든 Recharts 컴포넌트에 대한 모의 컴포넌트 반환
  const components = {
    BarChart: createMockComponent("BarChart"),
    Bar: createMockComponent("Bar"),
    XAxis: createMockComponent("XAxis"),
    YAxis: createMockComponent("YAxis"),
    CartesianGrid: createMockComponent("CartesianGrid"),
    Tooltip: createMockComponent("Tooltip"),
    Legend: createMockComponent("Legend"),
    ResponsiveContainer: (props) => {
      try {
        return React.createElement(
          "div",
          {
            style: {
              width: "100%",
              height: props.height || "300px",
              border: "1px dashed #ccc",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px 0",
            },
          },
          props.children || "Responsive Container",
        )
      } catch (error) {
        console.error("Error creating ResponsiveContainer:", error)
        return React.createElement(
          "div",
          { style: { color: "red", padding: "10px", border: "1px solid red" } },
          "Error rendering ResponsiveContainer",
        )
      }
    },
    RadarChart: createMockComponent("RadarChart"),
    PolarGrid: createMockComponent("PolarGrid"),
    PolarAngleAxis: createMockComponent("PolarAngleAxis"),
    PolarRadiusAxis: createMockComponent("PolarRadiusAxis"),
    Radar: createMockComponent("Radar"),
    LineChart: createMockComponent("LineChart"),
    Line: createMockComponent("Line"),
  }

  return components
}

// 모의 아이콘 컴포넌트 팩토리 생성
export const createIconProxy = (LucideIcons) => {
  // 자주 사용되는 아이콘 목록 - 이 목록에 없는 아이콘도 프록시를 통해 처리됨
  const commonIcons = [
    "Users",
    "User",
    "UserCheck",
    "Building",
    "ArrowUpRight",
    "ArrowDownRight",
    "CircleCheck",
    "Coins",
    "Heart",
    "Shield",
    "TrendingUp",
    "Clock",
    "BarChart2",
    "DollarSign",
    "FileText",
    "Check",
    "ChevronsUpDown",
    "Search",
    "File",
    "X",
    "FileUp",
    "Code",
    "Eye",
    "FileDown",
    "AlertTriangle",
    "Wand2",
    "Lightbulb",
    "ChevronRight",
    "Settings",
    "Printer",
    "FileImage",
    "RefreshCw",
    "Loader2",
    "CreditCard",
  ]

  // 모든 Lucide 아이콘에 대한 프록시 생성
  const iconCache = {}

  return new Proxy(
    {},
    {
      get: (target, prop) => {
        // 이미 캐시된 아이콘이 있으면 반환
        if (iconCache[prop]) {
          return iconCache[prop]
        }

        try {
          // 아이콘이 LucideIcons에 존재하면 캐시하고 반환
          if (prop in LucideIcons) {
            iconCache[prop] = LucideIcons[prop]
            return iconCache[prop]
          }

          // 그렇지 않으면 대체 아이콘 컴포넌트 생성 및 캐시
          const fallbackIcon = (props) => {
            try {
              return React.createElement(
                "div",
                {
                  ...props,
                  style: {
                    display: "inline-flex",
                    width: props.size || "24px",
                    height: props.size || "24px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                    fontSize: "10px",
                    textAlign: "center",
                    lineHeight: props.size || "24px",
                    border: "1px dashed #ccc",
                  },
                  title: `Icon: ${String(prop)}`,
                  "data-icon": String(prop),
                  "aria-label": `Icon placeholder for ${String(prop)}`,
                },
                typeof prop === "string" ? prop.toString().slice(0, 3) : "ico",
              )
            } catch (renderError) {
              console.error(`Error rendering fallback icon for ${String(prop)}:`, renderError)
              // 최후의 대체 아이콘 - 절대 실패하지 않아야 함
              return React.createElement(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#ffeeee",
                    textAlign: "center",
                    lineHeight: "24px",
                    fontSize: "12px",
                    color: "#ff0000",
                    border: "1px solid #ff0000",
                    borderRadius: "4px",
                  },
                },
                "!",
              )
            }
          }

          iconCache[prop] = fallbackIcon
          return fallbackIcon
        } catch (error) {
          console.error(`Error in icon proxy for ${String(prop)}:`, error)
          // 오류 발생 시 절대 실패하지 않는 대체 아이콘 반환
          return () =>
            React.createElement(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#ffeeee",
                  textAlign: "center",
                  lineHeight: "24px",
                  fontSize: "12px",
                  color: "#ff0000",
                  border: "1px solid #ff0000",
                  borderRadius: "4px",
                },
              },
              "!",
            )
        }
      },
    },
  )
}
