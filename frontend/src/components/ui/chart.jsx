import React, { useContext, createContext, useId, useMemo, forwardRef } from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" };

const ChartContext = createContext(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

function ChartContainer({ id, className, children, config, ...props }, ref) {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={`chart-container ${className || ""}`.trim()}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.theme || cfg.color);
  if (!colorConfig.length) return null;

  const styles = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const lines = colorConfig
        .map(([key, itemConfig]) => {
          const color = itemConfig.theme?.[theme] || itemConfig.color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");

      return `${prefix} [data-chart=${id}] {
${lines}
}`;
    })
    .join("\n");

  return <style>{styles}</style>;
};

const ChartTooltipContent = forwardRef(function TooltipContent(
  {
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    formatter,
    color,
    nameKey,
    labelKey,
  },
  ref
) {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = `${labelKey || item.dataKey || item.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string"
      ? config[label]?.label || label
      : itemConfig?.label;

    return labelFormatter ? (
      <div className="tooltip-label">{labelFormatter(value, payload)}</div>
    ) : value ? (
      <div className="tooltip-label">{value}</div>
    ) : null;
  }, [label, labelFormatter, payload, hideLabel, config, labelKey]);

  if (!active || !payload?.length) return null;
  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div ref={ref} className={`tooltip-box ${className || ""}`.trim()}>
      {!nestLabel && tooltipLabel}
      <div className="tooltip-items">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div key={item.dataKey} className="tooltip-item">
              {!hideIndicator && (
                <div className={`tooltip-indicator ${indicator}`} style={{ backgroundColor: indicatorColor }} />
              )}
              <div className="tooltip-content">
                {nestLabel && tooltipLabel}
                <span>{itemConfig?.label || item.name}</span>
                <span className="tooltip-value">{item.value.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const ChartLegendContent = forwardRef(function LegendContent(
  { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
  ref
) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div ref={ref} className={`legend ${verticalAlign} ${className || ""}`.trim()}>
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return (
          <div key={item.value} className="legend-item">
            {!hideIcon && <div className="legend-color" style={{ backgroundColor: item.color }} />}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});

function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) return undefined;

  const payloadPayload = payload.payload && typeof payload.payload === "object" ? payload.payload : undefined;
  let configLabelKey = key;

  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export {
  ChartContainer,
  RechartsTooltip as ChartTooltip,
  ChartTooltipContent,
  RechartsLegend as ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
