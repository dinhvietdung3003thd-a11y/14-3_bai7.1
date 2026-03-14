import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignInScreen() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validatePhone = (number: string) => {
    const regex = /^(0[0-9]{9})$/;
    return regex.test(number);
  };

  const formatPhone = (text: string) => {
    return text.replace(/\D/g, "");
  };

  const handleChange = (text: string) => {
    const formatted = formatPhone(text);
    setPhone(formatted);

    if (formatted.length === 0) {
      setError("");
    } else if (!validatePhone(formatted)) {
      setError("Số điện thoại không hợp lệ");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (!validatePhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không đúng định dạng");
      return;
    }

    router.push(`/home?phone=${phone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="numeric"
        value={phone}
        onChangeText={handleChange}
        maxLength={10}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Tiếp tục" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 5,
    borderRadius: 5,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});