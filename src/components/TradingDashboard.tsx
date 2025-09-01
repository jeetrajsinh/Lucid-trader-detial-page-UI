import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Circle, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the dashboard
const walletData = {
  address: "0x224B7a8f9C89eB4C4b1D2f8E3dA5E0B3C7F8E2D1",
  firstSeen: "365d ago",
  lastActivity: "4m ago",
  totalTrades: 8543,
  totalValue: 45678.38,
  change24h: 847.23,
  changePercent: 1.89,
  netDeposits: 10000,
  deposits: 15000,
  withdrawals: 5000,
  pureTrading: 35678.38,
  tradingROI: 356.78,
  dataQuality: "Live",
  lastUpdate: "2s ago",
  nextUpdate: "28s",
  confidence: 99.9
};

const keyMetrics = {
  winRate: 68.4,
  winRateRange: [66.1, 70.7],
  totalWins: 2952,
  totalTrades: 4315,
  truePnL: 35678,
  funding: 4300,
  fees: -28500,
  trueROI: 356.78,
  twr: 127.3,
  mwr: 145.2,
  maxDrawdown: -8234,
  maxDrawdownPercent: -18.7,
  drawdownDays: 5,
  sharpeRatio: 1.83
};

const positions = [
  {
    symbol: "BTC",
    side: "LONG",
    size: 0.25,
    entry: 67420,
    mark: 68923,
    pnl: 375.75,
    roe: 8.9,
    time: "2h15m",
    funding: -2.15,
    liquidation: 45000
  },
  {
    symbol: "ETH",
    side: "SHORT",
    size: 4.5,
    entry: 3847,
    mark: 3792,
    pnl: 247.50,
    roe: 5.7,
    time: "5h32m",
    funding: 8.40,
    liquidation: 5000
  },
  {
    symbol: "SOL",
    side: "LONG",
    size: 120,
    entry: 142.30,
    mark: 144.85,
    pnl: 306.00,
    roe: 1.8,
    time: "1d4h",
    funding: -45.20,
    liquidation: 95
  }
];

function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <Circle className="h-2 w-2 fill-live text-live animate-pulse" />
      <span className="text-sm text-data-quality font-medium">Live</span>
    </div>
  );
}

function Header() {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">
              {walletData.address.slice(0, 8)}...
            </span>
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            First Seen: {walletData.firstSeen}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm">Last Activity: {walletData.lastActivity}</div>
          <div className="text-sm">Total Trades: {walletData.totalTrades.toLocaleString()}</div>
        </div>
        
        <div className="space-y-1 text-right">
          <LiveIndicator />
          <div className="text-xs text-muted-foreground">
            Next Update: {walletData.nextUpdate}
          </div>
          <div className="text-xs text-muted-foreground">
            Confidence: {walletData.confidence}%
          </div>
        </div>
      </div>
    </Card>
  );
}

function ValueBar() {
  const isPositive = walletData.change24h > 0;
  
  return (
    <Card className="p-4">
      <div className="grid grid-cols-5 gap-6">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Value</div>
          <div className="text-2xl font-bold">${walletData.totalValue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Perp+Spot</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">24h Change</div>
          <div className={cn("text-xl font-semibold flex items-center gap-1", 
            isPositive ? "text-profit" : "text-loss")}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            ${Math.abs(walletData.change24h).toLocaleString()}
          </div>
          <div className={cn("text-sm", isPositive ? "text-profit" : "text-loss")}>
            {isPositive ? "+" : ""}{walletData.changePercent}%
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Net Deposits</div>
          <div className="text-xl font-semibold">${walletData.netDeposits.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">
            {walletData.deposits / 1000}k in, {walletData.withdrawals / 1000}k out
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Pure Trading</div>
          <div className="text-xl font-semibold text-profit">
            +${walletData.pureTrading.toLocaleString()}
          </div>
          <div className="text-sm text-profit">{walletData.tradingROI}% ROI</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Data Quality</div>
          <LiveIndicator />
          <div className="text-xs text-muted-foreground">Complete: Yes</div>
        </div>
      </div>
    </Card>
  );
}

function KeyMetricsRow() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Win Rate</div>
          <div className="text-2xl font-bold">{keyMetrics.winRate}%</div>
          <div className="text-xs text-muted-foreground">
            [{keyMetrics.winRateRange[0]}-{keyMetrics.winRateRange[1]}]
          </div>
          <div className="text-xs text-muted-foreground">
            {keyMetrics.totalWins}W/{keyMetrics.totalTrades}T
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">True PnL</div>
          <div className="text-2xl font-bold text-profit">
            +${keyMetrics.truePnL.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            Funding: +{(keyMetrics.funding / 1000).toFixed(1)}k
          </div>
          <div className="text-xs text-muted-foreground">
            Fees: {keyMetrics.fees / 1000}k
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">True ROI</div>
          <div className="text-2xl font-bold text-profit">{keyMetrics.trueROI}%</div>
          <div className="text-xs text-muted-foreground">TWR: {keyMetrics.twr}%</div>
          <div className="text-xs text-muted-foreground">MWR: {keyMetrics.mwr}%</div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Max Drawdown</div>
          <div className="text-2xl font-bold text-loss">
            ${Math.abs(keyMetrics.maxDrawdown).toLocaleString()}
          </div>
          <div className="text-xs text-loss">{keyMetrics.maxDrawdownPercent}%</div>
          <div className="text-xs text-muted-foreground">
            {keyMetrics.drawdownDays} days
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Sharpe Ratio</div>
          <div className="text-2xl font-bold">{keyMetrics.sharpeRatio}</div>
          <div className="text-xs text-muted-foreground">Historical</div>
          <div className="text-xs text-muted-foreground">Annualized</div>
        </div>
      </Card>
    </div>
  );
}

function PositionsTable() {
  const totalUnrealized = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalFunding = positions.reduce((sum, pos) => sum + pos.funding, 0);
  
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Live Positions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">Symbol</th>
                <th className="text-left p-2">Side</th>
                <th className="text-left p-2">Size</th>
                <th className="text-left p-2">Entry</th>
                <th className="text-left p-2">Mark</th>
                <th className="text-left p-2">PNL</th>
                <th className="text-left p-2">ROE</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">Funding</th>
                <th className="text-left p-2">Liq</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-2 font-medium">{position.symbol}</td>
                  <td className="p-2">
                    <Badge variant={position.side === "LONG" ? "default" : "destructive"}>
                      {position.side}
                    </Badge>
                  </td>
                  <td className="p-2">{position.size}</td>
                  <td className="p-2">${position.entry.toLocaleString()}</td>
                  <td className="p-2">${position.mark.toLocaleString()}</td>
                  <td className={cn("p-2 font-medium", 
                    position.pnl > 0 ? "text-profit" : "text-loss")}>
                    {position.pnl > 0 ? "+" : ""}${position.pnl.toFixed(2)}
                  </td>
                  <td className={cn("p-2", position.roe > 0 ? "text-profit" : "text-loss")}>
                    {position.roe > 0 ? "+" : ""}{position.roe}%
                  </td>
                  <td className="p-2 text-muted-foreground">{position.time}</td>
                  <td className={cn("p-2", position.funding > 0 ? "text-profit" : "text-loss")}>
                    {position.funding > 0 ? "+" : ""}${position.funding.toFixed(2)}
                  </td>
                  <td className="p-2">${position.liquidation.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between text-sm border-t border-border pt-4">
          <span>Total Unrealized: <span className="text-profit font-medium">+${totalUnrealized.toFixed(2)}</span></span>
          <span>Total Funding Today: <span className="text-loss">-${Math.abs(totalFunding).toFixed(2)}</span></span>
          <span>Margin: <span className="font-medium">$9,779</span></span>
        </div>
      </div>
    </Card>
  );
}

export default function TradingDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header />
        <ValueBar />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="data-analysis">Data Analysis</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <KeyMetricsRow />
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">True Equity Curve</h3>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-muted-foreground">Chart visualization would go here</div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-muted-foreground">Pie chart would go here</div>
                </div>
              </Card>
            </div>
            
            <PositionsTable />
          </TabsContent>
          
          <TabsContent value="positions">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Detailed Positions Analysis</h2>
              <div className="text-muted-foreground">Position details and analysis coming soon...</div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Advanced Analytics</h2>
              <div className="text-muted-foreground">Advanced metrics and analysis coming soon...</div>
            </Card>
          </TabsContent>
          
          <TabsContent value="patterns">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Trading Patterns</h2>
              <div className="text-muted-foreground">Pattern analysis and calendar coming soon...</div>
            </Card>
          </TabsContent>
          
          <TabsContent value="data-analysis">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Data Analysis</h2>
              <div className="text-muted-foreground">Detailed data analysis coming soon...</div>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
              <div className="text-muted-foreground">Transaction history and timeline coming soon...</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}