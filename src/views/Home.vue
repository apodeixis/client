<template>
  <div
    class="w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 xxl:px-64 simple-text-color-1">
    <div class="w-full flex flex-col section-bg-color min-h-screen">
      <h1 class="text-center text-3xl font-serif p-4 highlighted-text-color-1">{{ $t('A_WhatIsApodeixis') }}</h1>
      <div class="mx-8 text-2xl">
        <p class="my-2">Project about providing the ability to prove ownership and timestamp
          of specific
          articles. It may be either patent whitepaper, or military/stock price predictiIsons
          and so on. Everything that you could possibly write in a limited amount of
          characters.</p>
        <p class="my-2">This is assured via EVM-supportive chains (such as Ethereum Mainnet,
          Polygon
          Mainnet, Binance Smart Chain, etc). These blockchains are an epitome of
          decentralized systems which guarantees unforgeability and non-fungibility of
          records
          which are already there. It is ensured with the power of mathematical cryptography
          and algorithmic open-source laws of its ecosystem.</p>
        <p class="my-2">As per the architecture, there will be back-end written in Go and
          front-end
          developed with Vue.js. Furthermore, in the blockchain itself will be deployed
          Solidity Smart Contract required for facilitating the interaction with EVM-chains
          under the hood, while providing public (allowed for 3-rd party auditors to check)
          interfaces. Besides, the system will be using Postgresql database and, possibly,
          Redis for caching purposes.</p>
      </div>
      <p class="text-center text-3xl p-4 font-serif highlighted-text-color-1">{{ $t('A_FAQ') }}</p>
      <div class="mx-8 text-2xl">
        <p class="my-2">Here will be some answers to your questions</p>
      </div>
    </div>
  </div>
  <footer
    class="flex justify-between bg-gradient-to-r from-gray-900 via-zink-900 to-gray-900">
    <div class="h-16 mx-auto items-center flex text-3xl reverse-text-color font-serif text-purple-200">Apodeixis
    </div>
  </footer>
</template>

<script>

</script>