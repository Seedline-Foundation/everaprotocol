// T038 - Implement TokenEconomicsChart component
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface TokenAllocation {
  category: string;
  percentage: number;
  amount: number;
  description: string;
  color: string;
}

interface TokenEconomicsChartProps {
  allocations: TokenAllocation[];
  totalSupply?: number;
  chartType?: 'pie' | 'donut';
  showLegend?: boolean;
  showPercentages?: boolean;
}

export function TokenEconomicsChart({
  allocations,
  totalSupply = 1_000_000_000,
  chartType = 'donut',
  showLegend = true,
  showPercentages = true,
}: TokenEconomicsChartProps): JSX.Element {
  // Format large numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(1)}B`;
    }
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }
    return num.toLocaleString();
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-charcoal/10">
          <p className="font-bold text-charcoal mb-2">{data.category}</p>
          <p className="text-sm text-charcoal/70 mb-1">
            {data.percentage}% ({formatNumber(data.amount)} tokens)
          </p>
          <p className="text-xs text-charcoal/60">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-col gap-3 mt-6">
        {payload.map((entry: any, index: number) => (
          <div
            key={`legend-${index}`}
            className="flex items-center gap-3 text-sm"
          >
            <div
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-charcoal">
                  {entry.value}
                </span>
                {showPercentages && (
                  <span className="font-bold text-gold">
                    {entry.payload.percentage}%
                  </span>
                )}
              </div>
              <p className="text-xs text-charcoal/60 mt-0.5">
                {formatNumber(entry.payload.amount)} tokens
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const innerRadius = chartType === 'donut' ? '60%' : '0%';

  return (
    <AnimatedSection animation="fade" className="w-full">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-charcoal mb-2">
            Token Economics
          </h3>
          <p className="text-charcoal/70">
            Total Supply: <span className="font-bold text-gold">{formatNumber(totalSupply)}</span> EVERA
          </p>
        </div>

        {/* Chart */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Pie/Donut Chart */}
          <div className="w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={allocations}
                  cx="50%"
                  cy="50%"
                  innerRadius={innerRadius}
                  outerRadius="80%"
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="percentage"
                  label={({ percentage }) => `${percentage}%`}
                  labelLine={false}
                >
                  {allocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="w-full lg:w-1/2">
              {renderLegend({
                payload: allocations.map((item) => ({
                  value: item.category,
                  color: item.color,
                  payload: item,
                })),
              })}
            </div>
          )}
        </div>

        {/* Details Table (Mobile Friendly) */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal/10">
                <th className="text-left py-3 px-2 font-semibold text-charcoal">
                  Category
                </th>
                <th className="text-right py-3 px-2 font-semibold text-charcoal">
                  Percentage
                </th>
                <th className="text-right py-3 px-2 font-semibold text-charcoal">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((allocation, index) => (
                <tr
                  key={index}
                  className="border-b border-charcoal/5 hover:bg-stone/30 transition-colors"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: allocation.color }}
                      />
                      <span className="font-medium text-charcoal">
                        {allocation.category}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-gold">
                    {allocation.percentage}%
                  </td>
                  <td className="py-3 px-2 text-right text-charcoal/70">
                    {formatNumber(allocation.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-charcoal/20 font-bold">
                <td className="py-3 px-2 text-charcoal">Total</td>
                <td className="py-3 px-2 text-right text-gold">100%</td>
                <td className="py-3 px-2 text-right text-charcoal">
                  {formatNumber(totalSupply)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AnimatedSection>
  );
}
