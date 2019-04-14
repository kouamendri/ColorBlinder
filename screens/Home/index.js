import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo";
import { Header } from "../../components";
import styles from "./styles";

export default class Home extends Component {
  state = {
    isSoundOn: true
  };

  async componentWillMount() {
    this.backgroundMusic = new Audio.Sound();
    this.buttonFX = new Audio.Sound();
    try {
      await this.backgroundMusic.loadAsync(
        require("../../assets/music/Komiku_Mushrooms.mp3")
      );
      await this.buttonFX.loadAsync(require("../../assets/sfx/button.wav"));
      await this.backgroundMusic.setIsLoopingAsync(true);
      await this.backgroundMusic.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  onPlayPress = () => {
    this.buttonFX.playAsync();
    this.backgroundMusic.stopAsync();
    this.props.navigation.navigate("Game");
  };

  onLeaderboardPress = () => {
    console.log("onLeaderboardPress event handler");
  };

  onToggleSound = () => {
    this.setState({ isSoundOn: !this.state.isSoundOn });
  };

  render() {
    const imageSource = this.state.isSoundOn
      ? require("../../assets/icons/speaker-on.png")
      : require("../../assets/icons/speaker-off.png");

    return (
      <View style={styles.container}>
        <Header />
        <TouchableOpacity
          onPress={this.onPlayPress}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 80 }}
        >
          <Image
            source={require("../../assets/icons/play_arrow.png")}
            style={styles.playIcon}
          />
          <Text style={styles.play}>PLAY!</Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 80 }}
        >
          <Image
            source={require("../../assets/icons/trophy.png")}
            style={styles.trophyIcon}
          />
          <Text style={styles.hiscore}>Hi-score: 0</Text>
        </View>
        <TouchableOpacity
          onPress={this.onLeaderboardPress}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 80 }}
        >
          <Image
            source={require("../../assets/icons/leaderboard.png")}
            style={styles.leaderboardIcon}
          />
          <Text style={styles.leaderboard}>Leaderboard</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={[styles.copyrightText, { color: "#E64C3C" }]}>
              Music: Komiku
            </Text>
            <Text style={[styles.copyrightText, { color: "#F1C431" }]}>
              SFX: SubspaceAudio
            </Text>
            <Text style={[styles.copyrightText, { color: "#3998DB" }]}>
              Development: Kouame N'Dri
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={this.onToggleSound}>
            <Image source={imageSource} style={styles.soundIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
