import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
  return (
    <footer className="bg-white dark:bg-black border-t border-white dark:border-black py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-white0/10 dark:bg-black/20 p-8 border-2 border-white0/20 dark:border-black/30">
          <Icons.logo className="icon-class w-6 text-black dark:text-white0" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a href="#" className="text-black dark:text-white hover:text-black dark:hover:text-white0 transition-colors">Home</a>
            <a href="#" className="text-black dark:text-white hover:text-black dark:hover:text-white0 transition-colors">About</a>
            <a href="#" className="text-black dark:text-white hover:text-black dark:hover:text-white0 transition-colors">Services</a>
            <a href="#" className="text-black dark:text-white hover:text-black dark:hover:text-white0 transition-colors">Products</a>
            <a href="#" className="text-black dark:text-white hover:text-black dark:hover:text-white0 transition-colors">Contact</a>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full border-white0 dark:border-black text-black dark:text-white0 hover:bg-white dark:hover:bg-black">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-white0 dark:border-black text-black dark:text-white0 hover:bg-white dark:hover:bg-black">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-white0 dark:border-black text-black dark:text-white0 hover:bg-white dark:hover:bg-black">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-white0 dark:border-black text-black dark:text-white0 hover:bg-white dark:hover:bg-black">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" className="rounded-full bg-white dark:bg-black border-white dark:border-black text-black dark:text-white placeholder:text-white0 dark:placeholder:text-black" />
              </div>
              <Button type="submit" className="rounded-full bg-black hover:bg-black dark:bg-black dark:hover:bg-black text-white">Subscribe</Button>
            </form>
          </div>
          <div className="text-center">
            <p className="text-sm text-black dark:text-black">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }
