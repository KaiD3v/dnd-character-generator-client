import { useState, type Dispatch, type SetStateAction } from "react";
import { api } from "../utils/api";
import { useCharacter, type Character } from "../providers/character-provider";

interface CharacterFormBody {
  charClass: {
    className: string;
  };
  race: string;
  gender: string;
  level: number;
}

interface CharacterFormProps {
  isSend: boolean;
  setIsSend: Dispatch<SetStateAction<boolean>>;
}

export function CharacterForm({ isSend, setIsSend }: CharacterFormProps) {
  const [formBody, setFormBody] = useState<CharacterFormBody>({
    charClass: { className: "" },
    race: "",
    level: 1,
    gender: "",
  });
  const { setCharacter } = useCharacter();

  const races = [
    "Human",
    "Elf",
    "Dwarf",
    "Halfling",
    "Orc",
    "Gnome",
    "Tiefling",
    "Dragonborn",
    "Half-Elf",
    "Half-Orc",
  ];

  const classes = [
    "Fighter",
    "Wizard",
    "Rogue",
    "Cleric",
    "Ranger",
    "Paladin",
    "Bard",
    "Warlock",
    "Druid",
    "Monk",
    "Barbarian",
    "Sorcerer",
  ];

  const genders = ["Male", "Female"];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const safeBody: CharacterFormBody = {
      race: formBody.race || races[0],
      gender: formBody.gender || genders[0],
      level: formBody.level || 1,
      charClass: {
        className: formBody.charClass.className || classes[0],
      },
    };

    const response = await fetch(`${api}/generate-character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(safeBody),
    });

    if (!isSend) setIsSend(true);

    const data = await response.json();
    console.log("Enviado:", safeBody);
    console.log("Recebido:", data);
    try {
      setCharacter(data as Character);
    } catch (e) {
      // If the form is rendered outside the provider, don't crash the form.
      // Consumer should wrap the app with CharacterProvider.
      // eslint-disable-next-line no-console
      console.warn("CharacterProvider not available:", e);
    } 
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Race</label>
      <select
        required
        value={formBody.race}
        onChange={(e) => setFormBody({ ...formBody, race: e.target.value })}
      >
        <option value="">Select Race</option>
        {races.map((race) => (
          <option key={race} value={race}>
            {race}
          </option>
        ))}
      </select>

      <label>Class</label>
      <select
        required
        value={formBody.charClass.className}
        onChange={(e) =>
          setFormBody({
            ...formBody,
            charClass: { className: e.target.value },
          })
        }
      >
        <option value="">Select Class</option>
        {classes.map((charClass) => (
          <option key={charClass} value={charClass}>
            {charClass}
          </option>
        ))}
      </select>

      <label>Gender</label>
      <select
        required
        value={formBody.gender}
        onChange={(e) => setFormBody({ ...formBody, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        {genders.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>

      <label>Level</label>
      <input
        required
        value={formBody.level}
        type="number"
        min={1}
        max={20}
        onChange={(e) =>
          setFormBody({ ...formBody, level: Number(e.target.value) })
        }
        placeholder="Character Level"
      />

      <button type="submit">Generate</button>
    </form>
  );
}
