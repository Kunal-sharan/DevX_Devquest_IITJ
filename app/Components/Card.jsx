import HeartButton from "./HeartButton";

export default function Card({title,price,links,img}) {
  return (
    <div className="card w-80 bg-white shadow-xl flex flex-col gap-0 p-2">
      <div className="card-body flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <h2 className="card-title text-black font-jakarta-sans">{title}</h2>
          <HeartButton />
        </div>
        <figure className="relative">
          <div >
            <img
              src={
                img
                  ? img
                  : "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              }
              
              alt="Shoes"
              className="w-full h-auto rounded-lg aspect-square"
              width={200}
              height={300}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-60"></div>
        </figure>
        <div className="card-actions justify-between">
          <div className="flex flex-col gap-0">
            <h1 className="text-2xl text-black font-bold font-jakarta-sans">
              Rs.{price}
            </h1>
            <span className="text-sm text-gray-500 mt-0 font-jakarta-sans">
              Reviews available
            </span>
          </div>
          <a
            href={links}
            target="__blank"
            className="btn btn-primary text-white font-jakarta-sans"
          >
            view
          </a>
        </div>
      </div>
    </div>
  );
}
