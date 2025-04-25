---
title: "Snowflake Private Key"
description: "Step-by-Step: Creating a Snowflake Private Key Pair and Using It in Dekart"
date: 2025-04-22T07:48:05+01:00
lastmod: 2025-04-22T07:48:05+01:00
draft: false
menu:
  docs:
    parent: "usage"
images: []
---

This guide walks you through generating a Snowflake-compatible RSA key pair, configuring your Snowflake user for key-pair authentication, and using the private key in Dekart.


## Step 1: Generate a Key Pair
 - **Generate a Private Key**: Use OpenSSL to generate a private key in PKCS#8 format.
   ```bash
   openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
   ```
 - **Generate a Public Key**: Extract the public key from the private key.
   ```bash
   openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
   ```

 ## Step 2: Assign the Public Key to a Snowflake User
 - Log into Snowflake with a user that has the necessary permissions.
 - Assign the public key to the user using the following SQL command:
   ```sql
   ALTER USER example_user SET RSA_PUBLIC_KEY='MIIBIj...';
   ```

 ## Step 3: Configure the Snowflake Connection in Dekart
 - Set Snowflake Private Key in Connection Dialog with the base64-encoded private key.
 - The private key must be base64-encoded without the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` markers.
 - Remove all newlines from the base64-encoded string.
 ```bash
 cat rsa_key.p8 | sed '/-----BEGIN PRIVATE KEY-----/d' | sed '/-----END PRIVATE KEY-----/d' | tr -d '\n'
 ```


