import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Pricing() {
  return (
    <div className="w-full py-20 lg:py-40 bg-white dark:bg-black">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge className="bg-white dark:bg-black text-black dark:text-black border-white dark:border-black">Pricing</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular text-black dark:text-white">
              Prices that make sense!
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-black dark:text-black max-w-xl text-center">
              Managing a small business today is already tough.
            </p>
          </div>
          <div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x divide-white dark:divide-black pt-20">
            <div className="col-span-3 lg:col-span-1"></div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col bg-white dark:bg-black hover:bg-white dark:hover:bg-black transition-colors rounded-lg border border-transparent dark:border-black">
              <p className="text-2xl text-black dark:text-white font-semibold">Startup</p>
              <p className="text-sm text-black dark:text-black">
                Our goal is to streamline SMB trade, making it easier and faster
                than ever for everyone and everywhere.
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                <span className="text-4xl text-black dark:text-white font-bold">$40</span>
                <span className="text-sm text-black dark:text-black"> / month</span>
              </p>
              <Button variant="outline" className="gap-4 mt-8 border-white0 text-black hover:bg-white dark:border-black dark:text-white0 dark:hover:bg-black">
                Try it <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col bg-gradient-to-br from-white to-white dark:from-black dark:to-black border-2 border-white0 dark:border-black rounded-lg shadow-lg dark:shadow-black/20">
              <p className="text-2xl text-black dark:text-white font-semibold">Growth</p>
              <p className="text-sm text-black dark:text-white">
                Our goal is to streamline SMB trade, making it easier and faster
                than ever for everyone and everywhere.
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                <span className="text-4xl text-black dark:text-white0 font-bold">$40</span>
                <span className="text-sm text-black dark:text-black"> / month</span>
              </p>
              <Button className="gap-4 mt-8 bg-black hover:bg-black dark:bg-black dark:hover:bg-black text-white shadow-md">
                Try it <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col bg-white dark:bg-black hover:bg-white dark:hover:bg-black transition-colors rounded-lg border border-transparent dark:border-black">
              <p className="text-2xl text-black dark:text-white font-semibold">Enterprise</p>
              <p className="text-sm text-black dark:text-black">
                Our goal is to streamline SMB trade, making it easier and faster
                than ever for everyone and everywhere.
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                <span className="text-4xl text-black dark:text-white font-bold">$40</span>
                <span className="text-sm text-black dark:text-black"> / month</span>
              </p>
              <Button variant="outline" className="gap-4 mt-8 border-white0 text-black hover:bg-white dark:border-black dark:text-white0 dark:hover:bg-black">
                Contact us <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 bg-white dark:bg-black">
              <b className="text-black dark:text-white">Features</b>
            </div>
            <div className="bg-white dark:bg-black"></div>
            <div className="bg-white dark:bg-black"></div>
            <div className="bg-white dark:bg-black"></div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-black dark:text-white">SSO</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-black dark:text-white">
              AI Assistant
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Minus className="w-4 h-4 text-black dark:text-black" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-black dark:text-white">
              Version Control
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Minus className="w-4 h-4 text-black dark:text-black" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-black dark:text-white">
              Members
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <p className="text-black dark:text-black text-sm">5 members</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <p className="text-black dark:text-black text-sm">25 members</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <p className="text-black dark:text-black text-sm">100+ members</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-black dark:text-white">
              Multiplayer Mode
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Minus className="w-4 h-4 text-black dark:text-black" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-black dark:text-white">
              Orchestration
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Minus className="w-4 h-4 text-black dark:text-black" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center bg-white dark:bg-black">
              <Check className="w-4 h-4 text-black dark:text-white0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Pricing };
