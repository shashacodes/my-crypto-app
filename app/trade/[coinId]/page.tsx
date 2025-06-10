import BackHomeButton from "@/components/BackHomeButton";
import { TradeDialog } from "@/components/TradeDialog";
import { notFound } from "next/navigation";

interface CoinData {
  name: string;
  symbol: string;
  image: { large: string };
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

async function getCoinData(coinId: string): Promise<CoinData | null> {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ coinId: string }>; 
}) {
  const resolvedParams = await params; 
  const coin = await getCoinData(resolvedParams.coinId); 
  if (!coin) return notFound();




  return (
    <>
      <BackHomeButton />
      <main className="max-w-2xl md:mx-auto px-4 py-10 m-10 mx-4 rounded-bl-3xl border-x-black border-e-stone-800 rounded-tr-3xl border-x-[4px] ">
        <div className="flex items-center gap-4 mb-6">
          <img src={coin.image.large} alt={coin.name} className="w-12 h-12" />
          <h1 className="text-2xl font-bold">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h1>
        </div>

        <p className="mb-4 text-gray-600 text-lg">
          ${coin.market_data.current_price.usd.toLocaleString()}
        </p>

        <div className="flex gap-4">
          <TradeDialog coinName={coin.name} type="buy" />
          <TradeDialog coinName={coin.name} type="sell" />
        </div>
      </main>
    </>
  );
}
