import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const currentMetrics = {
  currentLeverage: 0.21,
  maxHistorical: 3.20,
  available: 20.00,
  marginUsed: 9779.83,
  freeMargin: 35898.55,
  utilization: 21.4
};

const positionFacts = [
  {
    position: "BTC Long",
    size: 17231,
    entry: 67420,
    mark: 68923,
    pnl: 375.75,
    portfolioPercent: 37.7,
    liqPrice: 45000,
    distance: 34.7
  },
  {
    position: "ETH Short",
    size: 17064,
    entry: 3847,
    mark: 3792,
    pnl: 247.50,
    portfolioPercent: 37.4,
    liqPrice: 5000,
    distance: 31.8
  },
  {
    position: "SOL Long",
    size: 17382,
    entry: 142.30,
    mark: 144.85,
    pnl: 306.00,
    portfolioPercent: 38.0,
    liqPrice: 95.00,
    distance: 52.2
  }
];

const concentrationData = {
  largestPosition: 38.0,
  top3Positions: 78.5,
  totalPositions: 12,
  longShortRatio: { long: 70, short: 30 },
  perpetuals: 3,
  spot: 9
};

const correlationMatrix = [
  { asset: "BTC", BTC: 1.00, ETH: 0.78, SOL: 0.65 },
  { asset: "ETH", BTC: 0.78, ETH: 1.00, SOL: 0.72 },
  { asset: "SOL", BTC: 0.65, ETH: 0.72, SOL: 1.00 }
];

export default function PositionAnalysisTab() {
  return (
    <div className="space-y-6">
      {/* Current Position Metrics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">CURRENT POSITION METRICS (FACTUAL ONLY)</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Current Leverage: 
              <span className="text-foreground font-medium ml-1">{currentMetrics.currentLeverage}x</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">Max Historical: 
              <span className="text-foreground font-medium ml-1">{currentMetrics.maxHistorical}x</span>
            </div>
            <div className="text-sm text-muted-foreground">Available: 
              <span className="text-foreground font-medium ml-1">{currentMetrics.available}x</span>
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Margin Used: 
              <span className="text-foreground font-medium ml-1">${currentMetrics.marginUsed.toLocaleString()}</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">Free Margin: 
              <span className="text-foreground font-medium ml-1">${currentMetrics.freeMargin.toLocaleString()}</span>
            </div>
            <div className="text-sm text-muted-foreground">Utilization: 
              <span className="text-foreground font-medium ml-1">{currentMetrics.utilization}%</span>
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{currentMetrics.utilization}%</div>
              <div className="text-xs text-muted-foreground">Margin Utilization</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Position Facts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">POSITION FACTS (NO ADVICE, PURE DATA)</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 font-medium">Position</th>
                <th className="text-left p-2 font-medium">Size</th>
                <th className="text-left p-2 font-medium">Entry</th>
                <th className="text-left p-2 font-medium">Mark</th>
                <th className="text-left p-2 font-medium">PnL</th>
                <th className="text-left p-2 font-medium">% Port</th>
                <th className="text-left p-2 font-medium">Liq Price</th>
                <th className="text-left p-2 font-medium">Distance</th>
              </tr>
            </thead>
            <tbody>
              {positionFacts.map((position, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{position.position.split(' ')[0]}</span>
                      <Badge variant={position.position.includes('Long') ? "default" : "destructive"} className="text-xs">
                        {position.position.split(' ')[1]}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-2">${position.size.toLocaleString()}</td>
                  <td className="p-2">${position.entry.toLocaleString()}</td>
                  <td className="p-2">${position.mark.toLocaleString()}</td>
                  <td className={cn("p-2 font-medium", 
                    position.pnl > 0 ? "text-profit" : "text-loss")}>
                    {position.pnl > 0 ? "+" : ""}${position.pnl.toFixed(2)}
                  </td>
                  <td className="p-2">{position.portfolioPercent}%</td>
                  <td className="p-2">${position.liqPrice.toLocaleString()}</td>
                  <td className="p-2">{position.distance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Concentration Analysis */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">CONCENTRATION ANALYSIS (MATHEMATICAL FACTS)</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-3 text-primary">Portfolio Concentration</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Largest Position:</span>
                <span className="font-medium">{concentrationData.largestPosition}%</span>
              </div>
              <div className="flex justify-between">
                <span>Top 3 Positions:</span>
                <span className="font-medium">{concentrationData.top3Positions}%</span>
              </div>
              <div className="flex justify-between">
                <span>Total Positions:</span>
                <span className="font-medium">{concentrationData.totalPositions}</span>
              </div>
              <div className="flex justify-between">
                <span>Long/Short Ratio:</span>
                <span className="font-medium">{concentrationData.longShortRatio.long}%/{concentrationData.longShortRatio.short}%</span>
              </div>
              <div className="flex justify-between">
                <span>Perpetuals:</span>
                <span className="font-medium">{concentrationData.perpetuals}, Spot: {concentrationData.spot}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-3 text-primary">Position Correlation Matrix</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-1"></th>
                    <th className="text-left p-1 font-medium">BTC</th>
                    <th className="text-left p-1 font-medium">ETH</th>
                    <th className="text-left p-1 font-medium">SOL</th>
                  </tr>
                </thead>
                <tbody>
                  {correlationMatrix.map((row) => (
                    <tr key={row.asset} className="border-b border-border">
                      <td className="p-1 font-medium text-primary">{row.asset}</td>
                      <td className="p-1">{row.BTC.toFixed(2)}</td>
                      <td className="p-1">{row.ETH.toFixed(2)}</td>
                      <td className="p-1">{row.SOL.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}