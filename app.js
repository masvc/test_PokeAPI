// DOM要素の取得
const fortuneBtn = document.getElementById("fortuneBtn");
const pokemonCard = document.getElementById("pokemonCard");
const monsterBall = document.getElementById("monsterBall");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonTypes = document.getElementById("pokemonTypes");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonAbilities = document.getElementById("pokemonAbilities");
const fortuneMessage = document.getElementById("fortuneMessage");

// PokeAPI のベースURL
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

// ポケモンの最大数（第9世代まで）
const MAX_POKEMON = 1008;

// おみくじメッセージリスト
const FORTUNE_MESSAGES = [
  {
    title: "✨ 運気絶好調！",
    message:
      "今日のあなたは、まさに輝きの極み！このポケモンが放つ特別なオーラのように、あなたの魅力が最大限に引き出される日です。新しいチャレンジも、人間関係も、すべてが想像以上の展開を見せるでしょう。ためらっていた一歩を踏み出すなら、今日がベストなタイミング。思い切った行動が、予想以上の素晴らしい結果につながります！",
  },
  {
    title: "🌟 チャンスの予感",
    message:
      "今日は、特別な出会いや発見に恵まれる予感！このポケモンのような直感力と行動力を味方につけて、新しい可能性に飛び込んでみましょう。普段と違う道を選んでみたり、気になっていたことに挑戦してみたり。その勇気が、きっと素晴らしい展開につながります。あなたの中に眠る才能が、花開くときです！",
  },
  {
    title: "💫 パワー全開日和",
    message:
      "今日のあなたは、このポケモンのようにみなぎるパワーに満ちています！周りの人もあなたの情熱とエネルギーに引き寄せられ、自然と協力者が集まってくるでしょう。「できるかな？」と迷っていたことも、思い切って挑戦してみて。今日は特に、あなたの熱意が奇跡を起こす日。どんな夢も叶えられる可能性を秘めています！",
  },
  {
    title: "⭐️ 幸運のシンフォニー",
    message:
      "今日は、まるでこのポケモンが奏でる幸運の調べのように、すべてが心地よいハーモニーを奏でる日。人との出会いも、仕事も、趣味も、すべてが絶妙なタイミングで進展していきます。普段は気づかない小さな幸せにも目が向き、感謝の気持ちが溢れる素敵な一日に。この波に乗って、新しい一歩を踏み出しましょう！",
  },
  {
    title: "🌈 奇跡の予感",
    message:
      "今日のあなたは、このポケモンが持つ特別な力のように、何でも叶えられる魔法のような力を秘めています！「無理かも」と思っていたことでも、思い切って挑戦してみると意外な展開が。周りの人々もあなたの魅力に気づき、自然とサポートしてくれるはず。今日は特に、直感を信じて行動することで、素晴らしい未来が開けます！",
  },
];

// ポケモン情報を表示する関数
async function displayPokemon(pokemonData) {
  // モンスターボールを回転させながら消す
  monsterBall.style.animation = "spinOut 0.5s ease-out forwards";

  // アニメーション完了後にモンスターボールを非表示にし、ポケモンを表示
  setTimeout(() => {
    monsterBall.classList.add("hidden");
    pokemonCard.classList.remove("hidden");

    // 画像の設定
    pokemonImage.src =
      pokemonData.sprites.other["official-artwork"].front_default ||
      pokemonData.sprites.front_default;

    // ランダムなおみくじメッセージを選択
    const randomMessage =
      FORTUNE_MESSAGES[Math.floor(Math.random() * FORTUNE_MESSAGES.length)];
    fortuneMessage.innerHTML = `<h3 class="fortune-title">${randomMessage.title}</h3><p class="fortune-text">${randomMessage.message}</p>`;

    // 名前の設定（日本語名を取得）
    fetchPokemonDetails(pokemonData);
  }, 500);
}

// ポケモンの詳細情報を取得する関数
async function fetchPokemonDetails(pokemonData) {
  try {
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();
    const japaneseName =
      speciesData.names.find((name) => name.language.name === "ja")?.name ||
      pokemonData.name;
    pokemonName.textContent = japaneseName;

    // タイプの設定
    const types = pokemonData.types
      .map((type) => {
        const jaTypes = {
          normal: "ノーマル",
          fire: "ほのお",
          water: "みず",
          electric: "でんき",
          grass: "くさ",
          ice: "こおり",
          fighting: "かくとう",
          poison: "どく",
          ground: "じめん",
          flying: "ひこう",
          psychic: "エスパー",
          bug: "むし",
          rock: "いわ",
          ghost: "ゴースト",
          dragon: "ドラゴン",
          dark: "あく",
          steel: "はがね",
          fairy: "フェアリー",
        };
        return jaTypes[type.type.name] || type.type.name;
      })
      .join("、");
    pokemonTypes.textContent = `タイプ: ${types}`;

    // 高さと重さの設定
    pokemonHeight.textContent = `高さ: ${pokemonData.height / 10}m`;
    pokemonWeight.textContent = `重さ: ${pokemonData.weight / 10}kg`;

    // 特性の日本語名を取得して設定
    const abilitiesPromises = pokemonData.abilities.map(async (ability) => {
      const abilityResponse = await fetch(ability.ability.url);
      const abilityData = await abilityResponse.json();
      return (
        abilityData.names.find((name) => name.language.name === "ja")?.name ||
        ability.ability.name
      );
    });

    const japaneseAbilities = await Promise.all(abilitiesPromises);
    pokemonAbilities.textContent = `特性: ${japaneseAbilities.join("、")}`;
  } catch (error) {
    console.error("ポケモン詳細の取得に失敗しました:", error);
  }
}

// ランダムなポケモンを取得する関数
async function getRandomPokemon() {
  try {
    // ボタンを無効化
    fortuneBtn.disabled = true;

    // 現在のポケモンカードを非表示にし、モンスターボールを表示
    pokemonCard.classList.add("hidden");
    monsterBall.classList.remove("hidden");
    monsterBall.style.animation = "";

    const randomId = Math.floor(Math.random() * MAX_POKEMON) + 1;
    const response = await fetch(`${API_BASE_URL}${randomId}`);
    const data = await response.json();
    displayPokemon(data);
  } catch (error) {
    console.error("エラーが発生しました:", error);
    alert("ポケモンの取得に失敗しました。もう一度お試しください。");
  } finally {
    // ボタンを再度有効化
    fortuneBtn.disabled = false;
  }
}

// イベントリスナーの設定
fortuneBtn.addEventListener("click", getRandomPokemon);
