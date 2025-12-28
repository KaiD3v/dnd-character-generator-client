import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Character } from "../providers/character-provider";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ececec",
  },

  /* HEADER */
  header: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.9,
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
  },

  /* SECTIONS */
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1e293b",
    textTransform: "uppercase",
  },

  /* ATRIBUTOS */
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  statBox: {
    width: "48%",
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
    padding: 6,
    alignItems: "center",
  },
  statName: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#334155",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statMod: {
    fontSize: 9,
    color: "#475569",
  },

  small: {
    fontSize: 9,
  },
  listItem: {
    marginBottom: 3,
  },
});


type Props = {
  character: Character;
};

export function CharacterSheet({ character }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.subtitle}>
            {character.race.name} • {character.class.className} • {`Level ${character.level}`} • {character.alignment}
          </Text>

        </View>

        <View style={styles.grid}>
          {/* COLUNA ESQUERDA  */}
          <View style={styles.column}>
            {/* ATRIBUTOS */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Attributes</Text>

              <View style={styles.statsGrid}>
                {(
                  Object.entries(character.attributes) as [
                    keyof Character["attributes"],
                    number
                  ][]
                ).map(([key, value]) => {
                  const mod = character.modifiers[key];
                  return (
                    <View key={key} style={styles.statBox}>
                      <Text style={styles.statName}>{key.toUpperCase()}</Text>
                      <Text style={styles.statValue}>{value}</Text>
                      <Text style={styles.statMod}>
                        {mod >= 0 ? "+" : ""}
                        {mod}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>


            {/* COMBATE */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Combat</Text>
              <Text>CA: {character.ac}</Text>
              <Text>PV: {character.hp}</Text>
              <Text>Iniciativa: {character.initiative}</Text>
            </View>

            {/* EQUIPAMENTO */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Equipment</Text>
              <Text>Ouro: {character.equipment.gold} gp</Text>
              {character.equipment.items.map((item) => (
                <Text
                  key={item.equipment.index}
                  style={styles.listItem}
                >
                  • {item.equipment.name} x{item.quantity}
                </Text>
              ))}
            </View>
          </View>

          {/* COLUNA DIREITA */}
          <View style={styles.column}>
            {/* IDENTIDADE */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Identity</Text>
              <Text>Gênero: {character.gender}</Text>
              <Text>Idade: {character.age}</Text>
            </View>

            {/* BACKGROUND */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Background</Text>
              <Text style={styles.small}>
                <Text style={styles.statName}>Personality: </Text>
                {character.background.traits.personality || "-"}
              </Text>
              <Text style={styles.small}>
                <Text style={styles.statName}>Ideal: </Text>
                {character.background.traits.ideal || "-"}
              </Text>
              <Text style={styles.small}>
                <Text style={styles.statName}>Vínculo: </Text>
                {character.background.traits.bond || "-"}
              </Text>
              <Text style={styles.small}>
                <Text style={styles.statName}>Defeito: </Text>
                {character.background.traits.flaw || "-"}
              </Text>
            </View>

            {/* RAÇA */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Race</Text>
              {character.race.traits.map((trait: string, i: number) => (
                <Text key={i} style={styles.small}>
                  • {trait}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
