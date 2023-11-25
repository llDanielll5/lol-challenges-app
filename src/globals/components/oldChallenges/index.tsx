import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Modal, Button } from "native-base";

interface OldChallengesProps {
  modalVisible: boolean;
  setModalVisible: any;
  oldChallenges: any;
}

const OldChallengesModal = (props: OldChallengesProps) => {
  const { modalVisible, setModalVisible, oldChallenges } = props;

  const returnItemImg = (id: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/${id}.png`;
  };
  const returnChampImage = (name: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`;
  };

  return (
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
      <Modal.Content maxWidth="90%" style={{ width: "90%" }}>
        <Modal.CloseButton />
        <Modal.Header>Esses foram seus desafios passados!</Modal.Header>
        <Modal.Body style={{ alignItems: "center" }}>
          {oldChallenges.map((v: any, i: number) => (
            <View
              key={i}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: 4,
                flexDirection: "row",
                marginVertical: 4,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
                padding: 4,
              }}
            >
              <Text>Desafio {i}</Text>
              <Image
                width={30}
                height={50}
                source={{ uri: returnChampImage(v.champ) }}
              />
              <Image
                height={30}
                width={30}
                source={{ uri: returnItemImg(v.mythicalItem.id) }}
              />
              <Image
                height={30}
                width={30}
                source={{ uri: returnItemImg(v.boot.id) }}
              />
              {v.lendariesItems.map((v: any) => (
                <Image
                  width={30}
                  height={30}
                  source={{ uri: returnItemImg(v.id) }}
                />
              ))}
            </View>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="solid"
            colorScheme="blue"
            onPress={() => setModalVisible(false)}
          >
            Retornar ao Menu Principal
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

export default OldChallengesModal;
