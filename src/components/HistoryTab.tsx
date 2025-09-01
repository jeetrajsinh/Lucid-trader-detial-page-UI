import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const historyData = [
  {
    time: "9:38:15 AM",
    type: "Trade",
    symbol: "BTC",
    side: "BUY",
    size: "0.5",
    price: "$67,420",
    pnl: "-",
    balance: "$45,678",
    note: "Market"
  },
  {
    time: "9:15:32 AM",
    type: "Funding",
    symbol: "ETH",
    side: "-",
    size: "-",
    price: "-",
    pnl: "+$8.40",
    balance: "$45,678",
    note: "Received"
  },
  {
    time: "8:45:21 AM",
    type: "Trade",
    symbol: "ETH",
    side: "SELL",
    size: "2.0",
    price: "$3,847",
    pnl: "+$125",
    balance: "$45,669",
    note: "Limit"
  },
  {
    time: "Jun 20",
    type: "Withdraw",
    symbol: "USDC",
    side: "-",
    size: "$5,000",
    price: "-",
    pnl: "-",
    balance: "$40,669",
    note: "To:0x..."
  },
  {
    time: "Mar 15",
    type: "Deposit",
    symbol: "USDC",
    side: "-",
    size: "$5,000",
    price: "-",
    pnl: "-",
    balance: "$23,234",
    note: "From:Brdg"
  },
  {
    time: "Jan 1",
    type: "Deposit",
    symbol: "USDC",
    side: "-",
    size: "$10,000",
    price: "-",
    pnl: "-",
    balance: "$10,000",
    note: "Initial"
  }
];

const totalEvents = 12847;
const totalPages = 2141;
const currentPage = 1;

function getTypeColor(type: string) {
  switch (type) {
    case "Trade":
      return "bg-primary text-primary-foreground";
    case "Funding":
      return "bg-success text-success-foreground";
    case "Deposit":
      return "bg-chart-tertiary text-background";
    case "Withdraw":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getSideColor(side: string) {
  switch (side) {
    case "BUY":
      return "text-profit";
    case "SELL":
      return "text-loss";
    default:
      return "text-muted-foreground";
  }
}

export default function HistoryTab() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Activity Type:</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activity</SelectItem>
                <SelectItem value="trades">Trades</SelectItem>
                <SelectItem value="funding">Funding</SelectItem>
                <SelectItem value="deposits">Deposits</SelectItem>
                <SelectItem value="withdrawals">Withdrawals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Time Period:</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1d">1 Day</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Search:</span>
            <Input placeholder="Search transactions..." className="w-48" />
          </div>
        </div>
      </Card>

      {/* History Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium">Time</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Symbol</th>
                <th className="text-left p-3 font-medium">Side</th>
                <th className="text-left p-3 font-medium">Size</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">PnL</th>
                <th className="text-left p-3 font-medium">Balance</th>
                <th className="text-left p-3 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/30">
                  <td className="p-3 text-muted-foreground">{item.time}</td>
                  <td className="p-3">
                    <Badge className={cn("text-xs", getTypeColor(item.type))}>
                      {item.type}
                    </Badge>
                  </td>
                  <td className="p-3 font-medium">{item.symbol}</td>
                  <td className={cn("p-3 font-medium", getSideColor(item.side))}>
                    {item.side}
                  </td>
                  <td className="p-3">{item.size}</td>
                  <td className="p-3">{item.price}</td>
                  <td className={cn("p-3 font-medium", 
                    item.pnl.startsWith('+') ? "text-profit" : 
                    item.pnl.startsWith('-') ? "text-loss" : "text-muted-foreground")}>
                    {item.pnl}
                  </td>
                  <td className="p-3 font-medium">{item.balance}</td>
                  <td className="p-3 text-muted-foreground">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing 6 of {totalEvents.toLocaleString()} total events | Page {currentPage} of {totalPages.toLocaleString()}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="ghost" size="sm">
                2
              </Button>
              <Button variant="ghost" size="sm">
                3
              </Button>
              <span className="px-2 text-muted-foreground">...</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}