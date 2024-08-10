import { useState } from "react";
import styles from "@/styles/components.module.css";

export default function SearchBar({ onChange }) {
  const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
      const downHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };

      const upHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(false);
        }
      };

      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, [targetKey]);

    return keyPressed;
  };
  const [query, setQuery] = useState("");

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
    </form>
  );
}
