import { createContext, useContext, useState, type ReactNode } from "react";

export type Attributes = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Modifiers = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type EquipmentRef = {
  index: string;
  name: string;
  url: string;
};

export type EquipmentItem = {
  equipment: EquipmentRef;
  quantity: number;
};

export type Equipment = {
  gold: number;
  items: EquipmentItem[];
};

export type Race = {
  name: string;
  traits: string[];
};

export type ClassInfo = {
  className: string;
  baseAttributes: Attributes;
};

export type Background = {
  name: string;
  traits: {
    personality: string;
    ideal: string;
    bond: string;
    flaw: string;
  };
};

export type Character = {
  name: string;
  age: number;
  ac: number;
  level: number;
  alignment: string;
  attributes: Attributes;
  modifiers: Modifiers;
  hp: number;
  equipment: Equipment;
  race: Race;
  gender: string;
  class: ClassInfo;
  initiative: number;
  background: Background;
};

type CharacterContextValue = {
  character: Character | null;
  setCharacter: (c: Character) => void;
  resetCharacter: () => void;
};

const CharacterContext = createContext<CharacterContextValue | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [character, setCharacterState] = useState<Character | null>(null);

  function setCharacter(c: Character) {
    setCharacterState(c);
  }

  function resetCharacter() {
    setCharacterState(null);
  }

  return (
    <CharacterContext.Provider value={{ character, setCharacter, resetCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const ctx = useContext(CharacterContext);
  if (!ctx) throw new Error("useCharacter must be used within CharacterProvider");
  return ctx;
}

export default CharacterProvider;
