import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const calendarData = {
  month: "JANUARY 2024",
  weeks: [
    {
      days: [
        { day: "", pnl: 0, type: "empty" },
        { day: "1", pnl: 750, type: "profit" },
        { day: "2", pnl: 1250, type: "profit" },
        { day: "3", pnl: 450, type: "profit" },
        { day: "4", pnl: 1800, type: "profit" },
        { day: "5", pnl: 50, type: "small-profit" },
        { day: "6", pnl: 300, type: "profit" }
      ],
      total: "+$2,147 (+8.9%)"
    },
    {
      days: [
        { day: "7", pnl: 200, type: "profit" },
        { day: "8", pnl: -150, type: "loss" },
        { day: "9", pnl: 1100, type: "profit" },
        { day: "10", pnl: 350, type: "profit" },
        { day: "11", pnl: 1200, type: "profit" },
        { day: "12", pnl: -80, type: "loss" },
        { day: "13", pnl: 203, type: "profit" }
      ],
      total: "+$1,823 (+7.2%)"
    },
    {
      days: [
        { day: "14", pnl: 1500, type: "profit" },
        { day: "15", pnl: 800, type: "profit" },
        { day: "16", pnl: 134, type: "small-profit" },
        { day: "17", pnl: -200, type: "loss" },
        { day: "18", pnl: 1000, type: "profit" },
        { day: "19", pnl: 400, type: "profit" },
        { day: "20", pnl: 1400, type: "profit" }
      ],
      total: "+$3,234 (+12.1%)"
    },
    {
      days: [
        { day: "21", pnl: -300, type: "loss" },
        { day: "22", pnl: 100, type: "small-profit" },
        { day: "23", pnl: 500, type: "profit" },
        { day: "24", pnl: 1200, type: "profit" },
        { day: "25", pnl: 450, type: "profit" },
        { day: "26", pnl: 50, type: "small-profit" },
        { day: "27", pnl: -208, type: "loss" }
      ],
      total: "+$892 (+3.1%)"
    },
    {
      days: [
        { day: "28", pnl: 324, type: "profit" },
        { day: "29", pnl: 1100, type: "profit" },
        { day: "30", pnl: 200, type: "profit" },
        { day: "31", pnl: 500, type: "profit" },
        { day: "", pnl: 0, type: "empty" },
        { day: "", pnl: 0, type: "empty" },
        { day: "", pnl: 0, type: "empty" }
      ],
      total: "+$1,124 (+4.8%)"
    }
  ],
  monthTotal: "+$9,220 (+35.2%)",
  bestDay: "Jan 15 (+$1,234)",
  worstDay: "Jan 18 (-$567)",
  tradingDays: 22
};

const streakData = {
  currentStreak: { type: "win", count: 5, value: 1247 },
  longestWinStreak: { count: 23, value: 8234 },
  longestLossStreak: { count: 8, value: -3421 },
  avgWinStreak: 3.2,
  avgLossStreak: 1.8
};

const activityData = {
  tradingDays: 265,
  totalTrades: 8543,
  avgDailyTrades: 32.2,
  mostActiveDay: 147,
  leastActiveDay: 1
};

function getDayClass(type: string) {
  switch (type) {
    case "profit":
      return "bg-profit text-background";
    case "small-profit":
      return "bg-profit/60 text-background";
    case "loss":
      return "bg-loss text-background";
    case "empty":
      return "bg-transparent";
    default:
      return "bg-muted";
  }
}

export default function PatternsTab() {
  return (
    <div className="space-y-6">
      {/* Monthly P&L Calendar */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-primary">MONTHLY P&L CALENDAR (EACH BOX = 1 DAY)</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">{calendarData.month}</span>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-8 gap-2 text-xs">
            <div className="text-muted-foreground text-center font-medium">Week</div>
            <div className="text-muted-foreground text-center font-medium">M</div>
            <div className="text-muted-foreground text-center font-medium">T</div>
            <div className="text-muted-foreground text-center font-medium">W</div>
            <div className="text-muted-foreground text-center font-medium">T</div>
            <div className="text-muted-foreground text-center font-medium">F</div>
            <div className="text-muted-foreground text-center font-medium">S</div>
            <div className="text-muted-foreground text-center font-medium">S</div>
          </div>
          
          {calendarData.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-8 gap-2 text-xs">
              <div className="text-muted-foreground text-center font-medium">{weekIndex + 1}</div>
              {week.days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={cn(
                    "h-8 w-8 flex items-center justify-center text-xs font-medium rounded",
                    getDayClass(day.type)
                  )}
                >
                  {day.day}
                </div>
              ))}
            </div>
          ))}
          
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-xs mb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-profit rounded"></div>
                <span>$500+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-profit/60 rounded"></div>
                <span>$100-500</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-profit/30 rounded"></div>
                <span>$0-100</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-loss rounded"></div>
                <span>Loss</span>
              </div>
              <span className="ml-auto font-medium">Month: {calendarData.monthTotal}</span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Best Day: {calendarData.bestDay} | Worst: {calendarData.worstDay} | Trading Days: {calendarData.tradingDays}
            </div>
          </div>
        </div>
      </Card>

      {/* Streak Analysis & Trading Activity */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">STREAK ANALYSIS</h3>
          
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm font-medium mb-1">
                Current Streak: {streakData.currentStreak.count} Wins 
                <span className="text-profit ml-1">(+${streakData.currentStreak.value.toLocaleString()})</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Longest Win Streak:</span>
                <span>
                  {streakData.longestWinStreak.count} 
                  <span className="text-profit ml-1">(+${streakData.longestWinStreak.value.toLocaleString()})</span>
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Longest Loss Streak:</span>
                <span>
                  {streakData.longestLossStreak.count} 
                  <span className="text-loss ml-1">({streakData.longestLossStreak.value.toLocaleString()})</span>
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Avg Win Streak:</span>
                <span>{streakData.avgWinStreak}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Avg Loss Streak:</span>
                <span>{streakData.avgLossStreak}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">TRADING ACTIVITY</h3>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Trading Days:</span>
                <span className="font-medium">{activityData.tradingDays}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Total Trades:</span>
                <span className="font-medium">{activityData.totalTrades.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Avg Daily Trades:</span>
                <span className="font-medium">{activityData.avgDailyTrades}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Most Active Day:</span>
                <span className="font-medium">{activityData.mostActiveDay} trades</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Least Active Day:</span>
                <span className="font-medium">{activityData.leastActiveDay} trade</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}