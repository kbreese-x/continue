import VoyageEmbeddingsProvider from "./VoyageEmbeddingsProvider";
import SageMakerEmbeddingsProvider from "./SageMakerEmbeddingsProvider";
import { EmbedOptions, FetchFunction } from "../../index.js";

// Mock fetch function
const mockFetch: FetchFunction = async () => {
  return {} as Response;
};

const sageMakerOptions: EmbedOptions = {
  model: "xifin-chat-hf-embedding-actions-test-endpoint",
  profile: "default",
  requestOptions: {
    extraBodyProperties: {
      action: "embed"
    }
  }
};

const voyageOptions: EmbedOptions = {
  apiKey: "pa-J2LSN8ZgKV-6KUXYwS2PVPpLXspGyL5rkodt4GWiHS8", // Leave this blank, you'll paste in the actual key
  model: "voyage-code-2"
};

// describe("SageMakerEmbeddingsProvider", () => {
//   test("Default options", () => {
//     const provider = new SageMakerEmbeddingsProvider({} as EmbedOptions, mockFetch);
//     expect(provider.maxBatchSize).toBe(1);
//     expect(provider.options.region).toBe("us-west-2");
//   });

//   test("Custom maxBatchSize", () => {
//     const provider = new SageMakerEmbeddingsProvider({ maxBatchSize: 5 } as EmbedOptions, mockFetch);
//     expect(provider.maxBatchSize).toBe(5);
//   });

//   test("Custom region", () => {
//     const provider = new SageMakerEmbeddingsProvider({ region: "us-east-1" } as EmbedOptions, mockFetch);
//     expect(provider.maxBatchSize).toBe(1);
//     expect(provider.options.region).toBe("us-east-1");
//   });

//   test("Override all default options", () => {
//     const provider = new SageMakerEmbeddingsProvider({ 
//       region: "eu-west-1", 
//       maxBatchSize: 10 
//     } as EmbedOptions, mockFetch);
//     expect(provider.maxBatchSize).toBe(10);
//     expect(provider.options.region).toBe("eu-west-1");
//   });
// });


// describe("SageMakerEmbeddingsProvider Embedding Functionality", () => {
//   let provider: SageMakerEmbeddingsProvider;

//   beforeEach(() => {
//     provider = new SageMakerEmbeddingsProvider(sageMakerOptions, fetch);
//   });

//   test("Embed single chunk", async () => {
//     const result = await provider.embed(["Hello, world!"]);
//     expect(result).toHaveLength(1);
//     expect(result[0]).toHaveLength(1024);
//     expect(result[0].every((num: any) => typeof num === "number")).toBe(true);
//   });

//   test("Embed multiple chunks", async () => {
//     const chunks = ["Hello, world!", "This is a test", "OpenAI is amazing"];
//     const result = await provider.embed(chunks);
//     expect(result).toHaveLength(chunks.length);
//     result.forEach(embedding => {
//       expect(embedding).toHaveLength(1024);
//       expect(embedding.every((num: any) => typeof num === "number")).toBe(true);
//     });
//   });

//   test("Embed empty string", async () => {
//     const result = await provider.embed([""]);
//     expect(result).toHaveLength(1);
//     expect(result[0]).toHaveLength(1024);
//   });

//   test("Embed long text", async () => {
//     const longText = "a".repeat(1000);
//     const result = await provider.embed([longText]);
//     expect(result).toHaveLength(1);
//     expect(result[0]).toHaveLength(1024);
//   });

//   test("Embed text with special characters", async () => {
//     const specialText = "Hello, world! 123 $%^ &*()_+ \n\t";
//     const result = await provider.embed([specialText]);
//     expect(result).toHaveLength(1);
//     expect(result[0]).toHaveLength(1024);
//   });

//   test("Embed multiple chunks with varying lengths", async () => {
//     const chunks = ["Short", "Medium length text", "a".repeat(500)];
//     const result = await provider.embed(chunks);
//     expect(result).toHaveLength(chunks.length);
//     result.forEach(embedding => {
//       expect(embedding).toHaveLength(1024);
//     });
//   });

//   test("Embed maximum batch size", async () => {
//     const maxBatchSize = provider.maxBatchSize || 1;
//     const chunks = Array(maxBatchSize).fill("Test chunk");
//     const result = await provider.embed(chunks);
//     expect(result).toHaveLength(maxBatchSize);
//   });

//   test("Embed more than maximum batch size", async () => {
//     const maxBatchSize = provider.maxBatchSize || 1;
//     const chunks = Array(maxBatchSize + 1).fill("Test chunk");
//     const result = await provider.embed(chunks);
//     expect(result).toHaveLength(maxBatchSize + 1);
//   });

//   test("Embed non-English text", async () => {
//     const nonEnglishText = "こんにちは、世界！";
//     const result = await provider.embed([nonEnglishText]);
//     expect(result).toHaveLength(1);
//     expect(result[0]).toHaveLength(1024);
//   });

//   test("Embed mixed language text", async () => {
//     const mixedText = "Hello, 世界! Bonjour, мир!";
//     const result = await provider.embed([mixedText]);
//     expect(result).toHaveLength(1);
//     expect(result[0]).toHaveLength(1024);
//   });
// });


describe("Embedding Provider Comparison", () => {
  let sageMakerProvider: SageMakerEmbeddingsProvider;
  let voyageProvider: VoyageEmbeddingsProvider;

  beforeEach(() => {
    sageMakerProvider = new SageMakerEmbeddingsProvider(sageMakerOptions, fetch);
    voyageProvider = new VoyageEmbeddingsProvider(voyageOptions, fetch);
  });

  const testCases = [
    { name: "Single chunk", chunks: ["Hello, world!"] },
    { name: "Multiple chunks", chunks: ["Hello, world!", "This is a test", "OpenAI is amazing"] },
    { name: "Empty string", chunks: [""] },
    { name: "Long text", chunks: ["a".repeat(1000)] },
    { name: "Special characters", chunks: ["Hello, world! 123 $%^ &*()_+ \n\t"] },
    { name: "Non-English text", chunks: ["こんにちは、世界！"] },
    { name: "Mixed language text", chunks: ["Hello, 世界! Bonjour, мир!"] },
  ];

  testCases.forEach(({ name, chunks }) => {
    test(`Compare output shape for ${name}`, async () => {
      const sageMakerResult = await sageMakerProvider.embed(chunks);
      const voyageResult = await voyageProvider.embed(chunks);

      expect(sageMakerResult.length).toBe(chunks.length);
      expect(voyageResult.length).toBe(chunks.length);

      expect(sageMakerResult.length).toBe(voyageResult.length);

      sageMakerResult.forEach((embedding, index) => {
        expect(Array.isArray(embedding)).toBe(true);
        expect(embedding.length).toBe(1024); // SageMaker model dimension
        expect(embedding.every((num: any) => typeof num === "number")).toBe(true);
      });

      voyageResult.forEach((embedding, index) => {
        expect(Array.isArray(embedding)).toBe(true);
        // Note: Voyage model dimension might be different, adjust if needed
        expect(embedding.length).toBeGreaterThan(0);
        expect(embedding.every((num: any) => typeof num === "number")).toBe(true);
      });
    });
  });

  test("Compare output shape for large number of chunks", async () => {
    const largeChunks = Array(50).fill("Test chunk");
    const sageMakerResult = await sageMakerProvider.embed(largeChunks);
    const voyageResult = await voyageProvider.embed(largeChunks);

    expect(sageMakerResult.length).toBe(largeChunks.length);
    expect(voyageResult.length).toBe(largeChunks.length);
    expect(sageMakerResult.length).toBe(voyageResult.length);
  });

  test("Compare output shape for chunks exceeding batch size", async () => {
    const maxBatchSize = Math.max(
      sageMakerProvider.maxBatchSize || 1,
      voyageProvider.maxBatchSize || 1
    );
    const exceedingChunks = Array(maxBatchSize + 5).fill("Test chunk");

    const sageMakerResult = await sageMakerProvider.embed(exceedingChunks);
    const voyageResult = await voyageProvider.embed(exceedingChunks);

    expect(sageMakerResult.length).toBe(exceedingChunks.length);
    expect(voyageResult.length).toBe(exceedingChunks.length);
    expect(sageMakerResult.length).toBe(voyageResult.length);
  });
});
