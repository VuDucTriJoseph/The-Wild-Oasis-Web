import Counter from "../Component/Counter";

export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1/posts");

  const data = await res.json();

  return (
    <div>
      <h1>Cabins page</h1>
      <ul>
        {data.map((el) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
      <Counter />
    </div>
  );
}

// "https://jsonplaceholder.typicode.com/users/1/posts"
