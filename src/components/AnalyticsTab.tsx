import { Card } from "@/components/ui/card";

const advancedMetrics = {
  sharpeRatio: { value: 1.83, period: "30D" },
  sortino: { value: 2.41, period: "30D" },
  calmar: { value: 3.82, period: "1Y" },
  profitFactor: { value: 2.47, period: "All" },
  winLoss: { value: "2.53:1", period: "All" },
  riskReward: { value: 2.11, label: "Ratio" }
};

const tradingStats = {
  totalTrades: 8543,
  avgSize: 14230,
  totalFees: 28500
};

const lossData = {
  maxDailyLoss: -2850,
  avgDailyLoss: -342,
  losingDays: 78
};

const correlationMatrix = [
  { asset: "BTC", BTC: 1.00, ETH: 0.78, SOL: 0.65, TOTAL: 0.92 },
  { asset: "ETH", BTC: 0.78, ETH: 1.00, SOL: 0.72, TOTAL: 0.84 },
  { asset: "SOL", BTC: 0.65, ETH: 0.72, SOL: 1.00, TOTAL: 0.71 },
  { asset: "SPY", BTC: 0.23, ETH: 0.31, SOL: 0.18, TOTAL: 0.27 }
];

const timeBasedReturns = [
  { period: "1 Day", simple: "+1.89%", twr: "+1.89%", mwr: "+1.89%", count: 41 },
  { period: "7 Days", simple: "+23.4%", twr: "+22.1%", mwr: "+24.7%", count: 285 },
  { period: "30 Days", simple: "+82.3%", twr: "+67.2%", mwr: "+91.2%", count: 1249 },
  { period: "1 Year", simple: "+357%", twr: "+127%", mwr: "+145%", count: 8543 }
];

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 text-primary">ADVANCED METRICS</h2>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Sharpe Ratio</div>
              <div className="text-xl font-bold">{advancedMetrics.sharpeRatio.value}</div>
              <div className="text-xs text-muted-foreground">[{advancedMetrics.sharpeRatio.period} ⟲]</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Sortino</div>
              <div className="text-xl font-bold">{advancedMetrics.sortino.value}</div>
              <div className="text-xs text-muted-foreground">[{advancedMetrics.sortino.period} ⟲]</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Calmar</div>
              <div className="text-xl font-bold">{advancedMetrics.calmar.value}</div>
              <div className="text-xs text-muted-foreground">[{advancedMetrics.calmar.period} ⟲]</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Profit Factor</div>
              <div className="text-xl font-bold">{advancedMetrics.profitFactor.value}</div>
              <div className="text-xs text-muted-foreground">[{advancedMetrics.profitFactor.period} ⟲]</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Win/Loss</div>
              <div className="text-xl font-bold">{advancedMetrics.winLoss.value}</div>
              <div className="text-xs text-muted-foreground">[{advancedMetrics.winLoss.period} ⟲]</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">R:R</div>
              <div className="text-xl font-bold">{advancedMetrics.riskReward.value}</div>
              <div className="text-xs text-muted-foreground">{advancedMetrics.riskReward.label}</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">TRADING STATISTICS</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Trades</div>
              <div className="text-xl font-bold">{tradingStats.totalTrades.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">All time</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Avg Size</div>
              <div className="text-xl font-bold">${tradingStats.avgSize.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Per trade</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Fees</div>
              <div className="text-xl font-bold">${tradingStats.totalFees.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Paid to date</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">HISTORICAL LOSS DATA</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Max Daily Loss</div>
              <div className="text-xl font-bold text-loss">${Math.abs(lossData.maxDailyLoss).toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Historical</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Avg Daily Loss</div>
              <div className="text-xl font-bold text-loss">${Math.abs(lossData.avgDailyLoss)}</div>
              <div className="text-xs text-muted-foreground">Loss days only</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Days</div>
              <div className="text-xl font-bold">{lossData.losingDays}</div>
              <div className="text-xs text-muted-foreground">Losing</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">CORRELATION MATRIX</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2"></th>
                  <th className="text-left p-2 font-medium">BTC</th>
                  <th className="text-left p-2 font-medium">ETH</th>
                  <th className="text-left p-2 font-medium">SOL</th>
                  <th className="text-left p-2 font-medium">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.map((row) => (
                  <tr key={row.asset} className="border-b border-border">
                    <td className="p-2 font-medium text-primary">{row.asset}</td>
                    <td className="p-2">{row.BTC.toFixed(2)}</td>
                    <td className="p-2">{row.ETH.toFixed(2)}</td>
                    <td className="p-2">{row.SOL.toFixed(2)}</td>
                    <td className="p-2">{row.TOTAL.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">TIME-BASED RETURNS</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-medium">Period</th>
                  <th className="text-left p-2 font-medium">Simple</th>
                  <th className="text-left p-2 font-medium">TWR</th>
                  <th className="text-left p-2 font-medium">MWR</th>
                  <th className="text-left p-2 font-medium">Count</th>
                </tr>
              </thead>
              <tbody>
                {timeBasedReturns.map((period) => (
                  <tr key={period.period} className="border-b border-border">
                    <td className="p-2 font-medium">{period.period}</td>
                    <td className="p-2 text-profit">{period.simple}</td>
                    <td className="p-2 text-profit">{period.twr}</td>
                    <td className="p-2 text-profit">{period.mwr}</td>
                    <td className="p-2">{period.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}