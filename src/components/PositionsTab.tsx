import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const positionOverview = {
  activePositions: 12,
  totalExposure: 125420,
  exposureMultiplier: 2.7,
  longShort: { long: 70, short: 30 },
  longShortValue: { long: 88000, short: 37000 },
  marginUsed: 9779.83,
  marginPercent: 21.4,
  freeMargin: 35898.55,
  freeMarginPercent: 78.6,
  perpSpot: { perp: 3, spot: 9 }
};

const assetPerformance = [
  {
    symbol: "BTC",
    trades: 543,
    winPercent: 65.8,
    truePnL: 11640,
    avgWin: 385.20,
    avgLoss: -182.50,
    riskReward: 2.11,
    sharpe: 2.13,
    best: 2500,
    worst: -850,
    expectancy: 21
  },
  {
    symbol: "ETH",
    trades: 892,
    winPercent: 71.2,
    truePnL: 8925,
    avgWin: 125.80,
    avgLoss: -95.40,
    riskReward: 1.32,
    sharpe: 1.97,
    best: 1800,
    worst: -420,
    expectancy: 15
  },
  {
    symbol: "SOL",
    trades: 421,
    winPercent: 62.3,
    truePnL: 4231,
    avgWin: 287.40,
    avgLoss: -165.20,
    riskReward: 1.74,
    sharpe: 1.65,
    best: 3200,
    worst: -980,
    expectancy: 18
  }
];

export default function PositionsTab() {
  return (
    <div className="space-y-6">
      {/* Position Overview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">POSITION OVERVIEW</h2>
        
        <div className="grid grid-cols-5 gap-6">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Active Pos</div>
            <div className="text-2xl font-bold">{positionOverview.activePositions}</div>
            <div className="text-xs text-muted-foreground">
              {positionOverview.perpSpot.perp} Perp {positionOverview.perpSpot.spot} Spot
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Exp</div>
            <div className="text-2xl font-bold">${positionOverview.totalExposure.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {positionOverview.exposureMultiplier}x Nominal
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Long/Short</div>
            <div className="text-2xl font-bold">
              {positionOverview.longShort.long}% / {positionOverview.longShort.short}%
            </div>
            <div className="text-xs text-muted-foreground">
              ${positionOverview.longShortValue.long / 1000}k / ${positionOverview.longShortValue.short}k
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Margin Used</div>
            <div className="text-2xl font-bold">${positionOverview.marginUsed.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {positionOverview.marginPercent}% of cap
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Free Margin</div>
            <div className="text-2xl font-bold">${positionOverview.freeMargin.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {positionOverview.freeMarginPercent}% available
            </div>
          </div>
        </div>
      </Card>

      {/* Asset Performance Matrix */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">ASSET PERFORMANCE MATRIX</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 font-medium">Symbol</th>
                <th className="text-left p-2 font-medium">Trades</th>
                <th className="text-left p-2 font-medium">Win%</th>
                <th className="text-left p-2 font-medium">True PnL</th>
                <th className="text-left p-2 font-medium">Avg Win</th>
                <th className="text-left p-2 font-medium">Avg Loss</th>
                <th className="text-left p-2 font-medium">R:R</th>
                <th className="text-left p-2 font-medium">Sharpe</th>
                <th className="text-left p-2 font-medium">Best</th>
                <th className="text-left p-2 font-medium">Worst</th>
                <th className="text-left p-2 font-medium">Exp</th>
              </tr>
            </thead>
            <tbody>
              {assetPerformance.map((asset) => (
                <tr key={asset.symbol} className="border-b border-border">
                  <td className="p-2 font-medium text-primary">{asset.symbol}</td>
                  <td className="p-2">{asset.trades}</td>
                  <td className="p-2 text-success">{asset.winPercent}%</td>
                  <td className="p-2 text-profit font-medium">
                    +${asset.truePnL.toLocaleString()}
                  </td>
                  <td className="p-2">${asset.avgWin.toFixed(2)}</td>
                  <td className="p-2 text-loss">${asset.avgLoss.toFixed(2)}</td>
                  <td className="p-2">{asset.riskReward.toFixed(2)}</td>
                  <td className="p-2">{asset.sharpe.toFixed(2)}</td>
                  <td className="p-2 text-profit">+${(asset.best / 1000).toFixed(1)}k</td>
                  <td className="p-2 text-loss">${asset.worst}</td>
                  <td className="p-2">${asset.expectancy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
          Expectancy = (Win% × Avg Win) - (Loss% × |Avg Loss|)
        </div>
      </Card>
    </div>
  );
}