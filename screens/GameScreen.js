import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generatePivotNumber(min, max) {
    return Math.floor((max+min)/2);
}

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }

    return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {
    const initialGuess = generateRandomBetween(1, 99);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([]);

    useEffect(() => {
        if(currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) {
        if(
            (direction == 'lower' && currentGuess < userNumber) ||
            (direction == 'higher' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't cheat!", 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }
    
        if( direction === 'lower' ) {
            maxBoundary = currentGuess;
        }
        else {
            minBoundary = currentGuess;
        }

        const guessedNumber = generatePivotNumber(minBoundary, maxBoundary);
        setGuessRounds(prevGuessRounds => [currentGuess, ...prevGuessRounds]);
        setCurrentGuess(guessedNumber);
    }

    const guessRoundsListLength = guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                            <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => (
                        <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />
                    )}
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    instructionText: {
        marginBottom: 12,
    },

    screen: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },

    buttonsContainer: {
        flexDirection: 'row',
    },

    button: {
        flex: 1,
    },

    listContainer: {
        flex: 1,
        padding: 16,
    },
});