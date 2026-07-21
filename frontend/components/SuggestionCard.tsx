interface Props {
  title:string;
  onClick:()=>void;
}


export default function SuggestionCard({
  title,
  onClick
}:Props){

return (

<button
onClick={onClick}
className="
rounded-xl
border
border-zinc-800
bg-zinc-900
p-4
text-left
transition
hover:bg-zinc-800
hover:border-blue-500
"
>

{title}

</button>

);

}