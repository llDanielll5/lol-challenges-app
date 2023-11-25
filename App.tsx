import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { boots, lendaries, mithycals } from "./src/globals/constants/items";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalChallenge from "./src/globals/components/modal";
import { NativeBaseProvider } from "native-base";
import OldChallengesModal from "./src/globals/components/oldChallenges";

const defaultStatus = {
  name: "",
  id: "",
};

export default function App() {
  const [champs, setChamps] = useState<any>([]);
  const [selectedChamp, setSelectedChamp] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [boot, setBoot] = useState(defaultStatus);
  const [mythicalItem, setMythicalItem] = useState(defaultStatus);
  const [lendariesItems, setLendariesItems] = useState<any[]>([]);
  const [oldChallenges, setOldChallenges] = useState([]);
  const [oldChallengesVisible, setOldChallengesVisible] = useState(false);

  const handleFinish = async () => {
    const success = () => {
      setBoot(defaultStatus);
      setMythicalItem(defaultStatus);
      setLendariesItems([]);
      setModalVisible(false);
      setSelectedChamp("");
    };
    if (oldChallenges.length === 0 || oldChallenges.length === undefined) {
      await AsyncStorage.setItem(
        "SAVED_CHALLENGES",
        JSON.stringify([
          {
            champ: selectedChamp,
            boot,
            mythicalItem,
            lendariesItems,
          },
        ])
      )
        .then(() => {
          success();
          return alert("Seu Desafio agora foi gerado!");
        })
        .catch(() => alert("Erro ao gerar o seu desafio!"));
    } else {
      await AsyncStorage.setItem(
        "SAVED_CHALLENGES",
        JSON.stringify([
          ...oldChallenges,
          {
            champ: selectedChamp,
            boot,
            mythicalItem,
            lendariesItems,
          },
        ])
      )
        .then(() => {
          success();
          return alert("Seu Desafio agora foi gerado!");
        })
        .catch(() => alert("Erro ao gerar o seu desafio!"));
    }
  };

  const fetchChampions = async () => {
    await fetch(
      "https://ddragon.leagueoflegends.com/cdn/13.23.1/data/pt_BR/champion.json"
    )
      .then((res) => res.json())
      .then((result) => {
        let champions = Object.keys(result.data);
        setChamps(champions);
      });
  };

  const fetchSavedChallenges = async () => {
    let olds = await AsyncStorage.getItem("SAVED_CHALLENGES");
    if (olds !== null) {
      setOldChallenges(JSON.parse(olds));
    }
  };

  const getOldChallenges = () => {
    fetchSavedChallenges();
    setOldChallengesVisible(true);
  };

  useEffect(() => {
    Promise.all([fetchChampions(), fetchSavedChallenges()]);
  }, []);

  async function handleGenerateChallenge() {
    setLendariesItems([]);
    setModalVisible(true);
    setBoot(defaultStatus);
    setMythicalItem(defaultStatus);

    const randomizeArr = (arr: any[]) => {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const randomElement = arr[randomIndex];
      return randomElement;
    };

    let boot = randomizeArr(boots);
    let mythical = randomizeArr(mithycals);
    let lends: any[] = [];
    for (let i = 0; i < 4; i++) {
      let item = randomizeArr(lendaries);
      lends.push(item);
    }

    setSelectedChamp(randomizeArr(champs));
    setBoot(boot);
    setMythicalItem(mythical);
    setLendariesItems((prev) => [...lends]);
    return;
  }

  if (champs.length === 0) return;

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ModalChallenge
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleFinish={handleFinish}
          lendariesItems={lendariesItems}
          mythicalItem={mythicalItem}
          selectedChamp={selectedChamp}
          boot={boot}
        />

        <OldChallengesModal
          modalVisible={oldChallengesVisible}
          setModalVisible={setOldChallengesVisible}
          oldChallenges={oldChallenges}
        />

        <Text style={{ fontSize: 27, fontWeight: "600", textAlign: "center" }}>
          Desafios Impossíveis do Lolzinho
        </Text>

        <Image
          source={{
            uri: "https://www.leagueoflegends.com/static/open-graph-b580f0266cc3f0589d0dc10765bc1631.jpg",
          }}
          style={{
            width: "90%",
            height: 200,
            marginBottom: 20,
            borderRadius: 20,
          }}
        />

        <Text style={styles.mainText}>
          Qual seu desafio Impossível de Hoje?
        </Text>
        <Button title="Gerar Desafio!" onPress={handleGenerateChallenge} />

        <View style={{ marginBottom: 20 }} />
        <Button title="Ver Desafios Passados!" onPress={getOldChallenges} />

        <Text style={{ fontSize: 12, fontWeight: "600", marginTop: 12 }}>
          Versão 1.0 (Aplicativo criado por Daniel Mota - Dann)
        </Text>
        <StatusBar style="dark" animated />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.8)",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  innerModal: {
    backgroundColor: "white",
    width: "80%",
    height: "100%",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
  },

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
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
});
