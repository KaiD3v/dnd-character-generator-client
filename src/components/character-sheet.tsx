import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Character } from "../providers/character-provider";

const styles = StyleSheet.create({
    page: {
        padding: 24,
        fontSize: 10,
        fontFamily: "Helvetica",
        backgroundColor: "#f4f4f4",
    },

    header: {
        borderBottom: "2px solid #000",
        marginBottom: 12,
        paddingBottom: 6,
    },

    name: {
        fontSize: 22,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 10,
        marginTop: 2,
    },

    grid: {
        flexDirection: "row",
        gap: 8,
    },

    column: {
        flexGrow: 1,
    },

    section: {
        border: "1px solid #000",
        borderRadius: 4,
        padding: 6,
        marginBottom: 8,
        backgroundColor: "#fff",
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 4,
        textTransform: "uppercase",
    },

    statRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },

    statName: {
        fontWeight: "bold",
    },

    small: {
        fontSize: 9,
    },

    listItem: {
        marginBottom: 2,
    },
});

type Props = {
    character: Character | null;
};

export function CharacterSheet({ character }: Props) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.name}>{character?.name}</Text>
                    <Text style={styles.subtitle}>
                        {character?.race.name} • {character?.class.className} • Nível{" "}
                        {character?.level} • {character?.alignment}
                    </Text>
                </View>

                <View style={styles.grid}>
                    {/* COLUNA ESQUERDA */}
                    <View style={styles.column}>
                        {/* ATRIBUTOS */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Atributos</Text>
                            {Object.entries(character?.attributes ?? {}).map(([key, value]) => {
                                const mod = (character as any)?.modifiers?.[key] ?? 0;
                                return (
                                    <View key={key} style={styles.statRow}>
                                        <Text style={styles.statName}>
                                            {key.toUpperCase()}
                                        </Text>
                                        <Text>
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>

                        {/* COMBATE */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Combate</Text>
                            <Text>Classe de Armadura: {character?.ac}</Text>
                            <Text>Pontos de Vida: {character?.hp}</Text>
                            <Text>Iniciativa: {character?.initiative}</Text>
                        </View>

                        {/* EQUIPAMENTO */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Equipamento</Text>
                            <Text>Ouro: {character?.equipment.gold} gp</Text>
                            {character?.equipment.items.map((item) => (
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
                            <Text style={styles.sectionTitle}>Identidade</Text>
                            <Text>Gênero: {character?.gender}</Text>
                            <Text>Idade: {character?.age}</Text>
                        </View>

                        {/* BACKGROUND */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Background</Text>
                            <Text style={styles.small}>
                                <Text style={styles.statName}>Personalidade: </Text>
                                {character?.background.traits.personality}
                            </Text>
                            <Text style={styles.small}>
                                <Text style={styles.statName}>Ideal: </Text>
                                {character?.background.traits.ideal}
                            </Text>
                            <Text style={styles.small}>
                                <Text style={styles.statName}>Vínculo: </Text>
                                {character?.background.traits.bond}
                            </Text>
                            <Text style={styles.small}>
                                <Text style={styles.statName}>Defeito: </Text>
                                {character?.background.traits.flaw}
                            </Text>
                        </View>

                        {/* RAÇA */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Raça</Text>
                            {character?.race.traits.map((trait: any, i: any) => (
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
