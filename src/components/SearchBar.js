import { useState } from "react";
import styles from "@/styles/page.module.css";

export default function SearchBar({ onChange }) {
  // // https://github.com/ngugikerei/usepopcorn/blob/3e024f62025bb6d6e58bfa902a1ea70b8daee04f/App-v2.js#L354
  // const inputEl = useRef(null);
  //
  // useEffect(() => {
  //   const callback = () => {
  //     if (document.activeElement === inputEl.current) return;
  //     if (e.code === "Enter") {
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   };
  //
  //   document.addEventListener("keydown", callback);
  // }); // flag: remove event listeners before; also why adding every time?

  const [query, setQuery] = useState("");
  // https://stackoverflow.com/questions/58349185/keeping-a-reference-to-a-react-state-variable

  const handleChange = (e) => {
    setQuery(e.target.value);
    onChange(e);
  };

  return (
    <form>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />

      {/* <p> */}
      {/*   <input */}
      {/*     type="checkbox" */}
      {/*     checked={props.inStockOnly} */}
      {/*     onChange={handleInStockChange} */}
      {/*   />{" "} */}
      {/*   Only show products in stock */}
      {/* </p> */}
    </form>
  );
}
