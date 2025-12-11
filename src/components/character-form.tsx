import { useState } from "react";
import { api } from "../utils/api";

interface CharacterFormBody {
  charClass: {
    className: string | undefined;
  };
  race: string | undefined;
  gender: string | undefined;
  level: number | undefined;
}

export function CharacterForm() {
  const [formBody, setFormBody] = useState<CharacterFormBody>({
    charClass: { className: undefined },
    race: undefined,
    level: undefined,
    gender: undefined,
  });

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

    const body = await fetch(`${api}/generate-character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });

    const data = await body.json();

    console.log(formBody);
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        required
        value={formBody.race}
        onChange={(e) => setFormBody({ ...formBody, race: e.target.value })}
      >
        {races.map((race) => (
          <option key={race} value={race}>
            {race}
          </option>
        ))}
      </select>
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
        {classes.map((charClass) => (
          <option key={charClass} value={charClass}>
            {charClass}
          </option>
        ))}
      </select>
      <select
        required
        value={formBody.gender}
        onChange={(e) => setFormBody({ ...formBody, gender: e.target.value })}
      >
        {genders.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      <input
        required
        value={formBody.level || "1"}
        type="number"
        onChange={(e) =>
          setFormBody({ ...formBody, level: Number(e.target.value) })
        }
        placeholder="Character Level"
      />
      <button type="submit">Generate</button>
    </form>
  );
}
