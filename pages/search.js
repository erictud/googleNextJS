import Head from "next/head";
import { useRouter } from "next/router";
import ImageResults from "../components/ImageResults";
import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";
import respone from "../Respone";

export default function SearchPage({ results }) {
  console.log(results);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Results for {router.query.term}</title>
      </Head>

      {/* Search header */}
      <SearchHeader />
      {/* Search results */}
      {router.query.searchType === "image" ? (
        <ImageResults results={results} />
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const startIndex = context.query.start || "1";
  const mockData = false;
  const data = mockData
    ? respone
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${
          process.env.CONTEXT_KEY
        }&q=${context.query.term}${
          context.query.searchType && "&searchType=image"
        }&start=${startIndex}`
      ).then((res) => res.json());
  return {
    props: {
      results: data,
    },
  };
}
