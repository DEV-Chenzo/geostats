'use client';

export default function Header() {
  return (
    <header className="w-full p-4 h-16 md:h-18 flex items-center justify-left bg-background ">
      <button className="ml-auto p-2 rounded-full text-muted-foreground border-2 border-muted-foreground">
        <span className="sr-only">Mode</span>
        
      </button>
    </header>
  );}
