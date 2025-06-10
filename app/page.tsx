'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';
import { Skeleton } from '@/components/ui/skeleton';
import CryptoSkeleton from '@/components/CryptoSkeleton';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const TOP_COINS = ['bitcoin', 'ethereum', 'solana', 'ripple', 'dogecoin', 'tether', 'bnb', 'tron', 'shiba']

export default function HomePage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); 

    useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      });
  }, []);




  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const topCoins = filteredCoins.filter((coin) => TOP_COINS.includes(coin.id));
  const otherCoins = filteredCoins.filter((coin) => !TOP_COINS.includes(coin.id));

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className='flex md:flex-row flex-col justify-between w-full'>

      <h1 className="text-3xl font-bold text-center mb-6">Crypto Exchange</h1>
      <div className="mb-8 flex justify-center">
        <Input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=""
          />
      </div>
          </div>

<section className="mb-12 overflow-hidden">
  <h2 className="text-xl font-medium mb-4 ">Top Cryptocurrencies</h2>
  <div className="relative w-full overflow-hidden">
    <div className="flex gap-4 animate-scroll whitespace-nowrap">
              {loading
          ? Array.from({ length: 12 }).map((_, index) => <CryptoSkeleton key={index} />)
          : topCoins.map((coin) => (

        <Link key={coin.id} href={`/trade/${coin.id}`} className="inline-block min-w-[200px]">
          <Card className="hover:shadow-lg transition-all w-full">
            <CardContent className="flex flex-col items-center p-5">
              <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-3" />
              <h2 className="text-sm font-semibold text-center">
                {coin.name} ({coin.symbol.toUpperCase()})
              </h2>
              <p className="text-gray-600 text-sm">${coin.current_price.toLocaleString()}</p>
              <Badge
                variant={coin.price_change_percentage_24h >= 0 ? 'default' : 'destructive'}
                className="mt-2"
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
</section>




      <section>
        <h2 className="text-xl font-medium mb-4 ">Other Cryptocurrencies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => <CryptoSkeleton key={index} />)
          : otherCoins.map((coin) => (
            <Link key={coin.id} href={`/trade/${coin.id}`}>
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="flex flex-col items-center p-5">
                  <img src={coin.image} alt={coin.name} className="w-16 h-16 mb-4" />
                  <h2 className="text-lg font-semibold">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    ${coin.current_price.toLocaleString()}
                  </p>
                  <Badge
                    variant={coin.price_change_percentage_24h >= 0 ? 'default' : 'destructive'}
                    className="mt-2"
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <ScrollToTop />
    </main>
  );
}
