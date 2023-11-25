import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Modal, Button } from "native-base";

interface ModalChallengeProps {
  modalVisible: boolean;
  setModalVisible: any;
  selectedChamp: any;
  boot: any;
  lendariesItems: any;
  mythicalItem: any;
  handleFinish: any;
}

const ModalChallenge = (props: ModalChallengeProps) => {
  const {
    modalVisible,
    setModalVisible,
    boot,
    lendariesItems,
    mythicalItem,
    selectedChamp,
    handleFinish,
  } = props;

  const returnItemImg = (id: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/${id}.png`;
  };
  const returnChampImage = (name: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`;
  };

  return (
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
      <Modal.Content maxWidth="90%">
        <Modal.CloseButton />
        <Modal.Header>Esse é o seu Desafio!</Modal.Header>
        <Modal.Body style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>
            Seu campeão é:{" "}
            <Text style={{ fontWeight: "bold" }}>{selectedChamp}</Text>
          </Text>

          <Image
            style={styles.champImage}
            source={{ uri: returnChampImage(selectedChamp) }}
          />

          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              marginVertical: 16,
              fontWeight: "bold",
            }}
          >
            Os itens do seu desafio são:
          </Text>

          <Text style={{ fontSize: 18 }}>Item Mítico:</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {mythicalItem.name}
          </Text>
          <Image
            style={styles.image}
            source={{ uri: returnItemImg(mythicalItem.id) }}
          />

          <Text style={{ fontSize: 18, marginTop: 16 }}>Bota:</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{boot.name}</Text>
          <Image
            style={styles.image}
            source={{ uri: returnItemImg(boot.id) }}
          />

          <Text style={{ fontSize: 18, marginTop: 16 }}>Itens Lendários:</Text>

          {lendariesItems.map((v: any, i: number) => (
            <View key={i} style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {lendariesItems[i].name}
              </Text>
              <Image
                style={styles.image}
                source={{ uri: returnItemImg(lendariesItems[i].id) }}
              />
            </View>
          ))}

          <View style={{ marginBottom: 16 }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="solid" colorScheme="blue" onPress={handleFinish}>
            Aceitar Desafio!
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  champImage: {
    height: 150,
    width: 100,
  },
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 4,
  },
  mainText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ModalChallenge;
