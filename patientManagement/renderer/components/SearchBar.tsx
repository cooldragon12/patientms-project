import React, { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import { TextInput, Loader } from "@mantine/core";

export default function SearchBar(props) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchActive(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [props.searchRef]);
  return (
    <>
      <TextInput
        placeholder="Search Patient"
        // label="Full name"
        onChange={(e) => {
          setSearchActive(true);
          setTimeout(() => setSearchActive(false), 2000);
          props.onChange(e);
        }}
        // onInput={() => setSearchActive(false)}
        withAsterisk
        rightSection={searchActive ? <Loader size="xs" /> : <></>}
        
        icon={<IconSearch size="0.9rem" stroke={1.5} />}

      />
    </>
  );
}
