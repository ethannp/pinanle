import React from "react";
import { event } from "react-ga";
import { IoSearch, IoCloseCircleOutline } from "react-icons/io5";
import { theme } from "../../constants";
import { searchSong } from "../../helpers";
import { Song } from "../../types/song";

import * as Styled from "./index.styled";

interface Props {
  currentTry: number;
  setSelectedSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
}

export function Search({ currentTry, setSelectedSong }: Props) {
  const [value, setValue] = React.useState<string>("");
  const [results, setResults] = React.useState<Song[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (value && isOpen) {
      setResults(searchSong(value));
    } else if (value === "") {
      setResults([]);
    }
  }, [value]);

  // clear value on selection
  React.useEffect(() => {
    setValue("");
  }, [currentTry]);
  
  function select(song: Song) {
    setSelectedSong(song);
    setResults([]);
    setIsOpen(false);
    setValue(`${song.artist} - ${song.name}`);
    event({
      category: "Player",
      action: "Chose song",
      label: `${song.artist} - ${song.name}`,
    });
  }


  return (
    <div style={{width: "100%"}} tabIndex={0} onFocus={() => {setIsOpen(true)}}>
      <Styled.Container>
        {isOpen && results.length > 0 && <Styled.ResultsContainer>
          <Styled.ResultsInfo>
            <IoCloseCircleOutline size={20} color={theme.red} style={{position:"absolute", bottom:"5", right: "5", cursor: "pointer"}} onClick={() => setIsOpen(false)} ></IoCloseCircleOutline>
            {results.length} result{results.length == 1 ? "" : "s"}
          </Styled.ResultsInfo>
          {results.map((song) => (
            <Styled.Result
              key={song.youtubeId}
              onClick={() => select(song)}
            >
              <Styled.ResultText>
                {song.artist} - {song.name}
              </Styled.ResultText>
            </Styled.Result>
          ))}
        </Styled.ResultsContainer> }
        <Styled.SearchContainer>
          <Styled.SearchPadding>
            <IoSearch size={20} color={theme.border100} />
            <Styled.Input
              onChange={(e) => {
                if(e.currentTarget.value != value) {
                  setValue(e.currentTarget.value)
                  setIsOpen(true);
                  setSelectedSong(undefined);
                }
                }}
              placeholder="Search"
              value={value}
            />
          </Styled.SearchPadding>
        </Styled.SearchContainer>
      </Styled.Container>
    </div>
  );
}
