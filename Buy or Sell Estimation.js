//@version=5
// Smart AI RSI with QQE | smarttradingindicators.com
indicator('Smart AI RSI with QQE')
RSI_Period = input(6, title='RSI Length')
SF = input(5, title='RSI Smoothing')
QQE = input(3, title='Fast QQE Factor')
ThreshHold = input(3, title='Thresh-hold')
//

src = input(close, title='RSI Source')
//

//
Wilders_Period = RSI_Period * 2 - 1


Rsi = ta.rsi(src, RSI_Period)
RsiMa = ta.ema(Rsi, SF)
AtrRsi = math.abs(RsiMa[1] - RsiMa)
MaAtrRsi = ta.ema(AtrRsi, Wilders_Period)
dar = ta.ema(MaAtrRsi, Wilders_Period) * QQE

longband = 0.0
shortband = 0.0
trend = 0

DeltaFastAtrRsi = dar
RSIndex = RsiMa
newshortband = RSIndex + DeltaFastAtrRsi
newlongband = RSIndex - DeltaFastAtrRsi
longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? math.max(longband[1], newlongband) : newlongband
shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? math.min(shortband[1], newshortband) : newshortband
cross_1 = ta.cross(longband[1], RSIndex)
trend := ta.cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL = trend == 1 ? longband : shortband
////////////////////


length = input.int(50, minval=1, title='Bollinger Length')
mult = input.float(0.35, minval=0.001, maxval=5, step=0.1, title='BB Multiplier')
basis = ta.sma(FastAtrRsiTL - 50, length)
dev = mult * ta.stdev(FastAtrRsiTL - 50, length)
upper = basis + dev
lower = basis - dev
color_bar = RsiMa - 50 > upper ? #09fb07 : RsiMa - 50 < lower ? #ff1104 : color.gray


//
// Zero cross
QQEzlong = 0
QQEzlong := nz(QQEzlong[1])
QQEzshort = 0
QQEzshort := nz(QQEzshort[1])
QQEzlong := RSIndex >= 50 ? QQEzlong + 1 : 0
QQEzshort := RSIndex < 50 ? QQEzshort + 1 : 0
//  

Zero = hline(0, color=color.white, linestyle=hline.style_dotted, linewidth=1)

////////////////////////////////////////////////////////////////

RSI_Period2 = input(6, title='RSI Length')
SF2 = input(5, title='RSI Smoothing')
QQE2 = input(1.61, title='Fast QQE2 Factor')
ThreshHold2 = input(3, title='Thresh-hold')

src2 = input(close, title='RSI Source')
//

//
Wilders_Period2 = RSI_Period2 * 2 - 1


Rsi2 = ta.rsi(src2, RSI_Period2)
RsiMa2 = ta.ema(Rsi2, SF2)
AtrRsi2 = math.abs(RsiMa2[1] - RsiMa2)
MaAtrRsi2 = ta.ema(AtrRsi2, Wilders_Period2)
dar2 = ta.ema(MaAtrRsi2, Wilders_Period2) * QQE2
longband2 = 0.0
shortband2 = 0.0
trend2 = 0

DeltaFastAtrRsi2 = dar2
RSIndex2 = RsiMa2
newshortband2 = RSIndex2 + DeltaFastAtrRsi2
newlongband2 = RSIndex2 - DeltaFastAtrRsi2
longband2 := RSIndex2[1] > longband2[1] and RSIndex2 > longband2[1] ? math.max(longband2[1], newlongband2) : newlongband2
shortband2 := RSIndex2[1] < shortband2[1] and RSIndex2 < shortband2[1] ? math.min(shortband2[1], newshortband2) : newshortband2
cross_2 = ta.cross(longband2[1], RSIndex2)
trend2 := ta.cross(RSIndex2, shortband2[1]) ? 1 : cross_2 ? -1 : nz(trend2[1], 1)
FastAtrRsi2TL = trend2 == 1 ? longband2 : shortband2


//
// Zero cross
QQE2zlong = 0
QQE2zlong := nz(QQE2zlong[1])
QQE2zshort = 0
QQE2zshort := nz(QQE2zshort[1])
QQE2zlong := RSIndex2 >= 50 ? QQE2zlong + 1 : 0
QQE2zshort := RSIndex2 < 50 ? QQE2zshort + 1 : 0
//  

hcolor2 = RsiMa2 - 50 > ThreshHold2 ? color.silver : RsiMa2 - 50 < 0 - ThreshHold2 ? color.silver : na
plot(FastAtrRsi2TL - 50, title='QQE Line', color=color.new(color.white, 0), linewidth=2)
plot(RsiMa2 - 50, color=hcolor2, title='Histo2', style=plot.style_columns, transp=50)

Greenbar1 = RsiMa2 - 50 > ThreshHold2
Greenbar2 = RsiMa - 50 > upper

Redbar1 = RsiMa2 - 50 < 0 - ThreshHold2
Redbar2 = RsiMa - 50 < lower
plot(Greenbar1 and Greenbar2 == 1 ? RsiMa2 - 50 : na, title='QQE Up', style=plot.style_columns, color=color.new(#09fb07, 0))
plot(Redbar1 and Redbar2 == 1 ? RsiMa2 - 50 : na, title='QQE Down', style=plot.style_columns, color=color.new(#ff1104, 0))
