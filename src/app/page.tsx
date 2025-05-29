import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <Image
        src="/imagenPrincipal.jpeg"
        alt="Imagen principal"
        width={350}
        height={150}
        className="w-full h-auto max-h-[500px] object-cover"
        priority
      />
      <h1 className="text-5xl md:text-6xl font-bold mt-8 text-gradient-purple">
        Aura Beauty
      </h1>
      <p className="text-xl md:text-2xl mt-4 text-gray-700">
        Más que belleza, armonía.
      </p>
    </div>
  );
}