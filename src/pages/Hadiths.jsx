import { useEffect, useState } from "react";
import { GoBack } from "../components";

export const Hadiths = () => {
  const [books, setBooks] = useState();
  const [chapters, setChapters] = useState();

  const key = "$2y$10$JCHEVsECeSbufOktxCbDePIshXa3OxMDnjeE83Vdlejv6PlkUG2";
  useEffect(() => {
    const apiUrl = `https://hadithapi.com/api/books?apiKey=${key}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data?.books);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const handleClickBook = (slug) => {
    if (slug) {
      const apiUrl = `https://hadithapi.com/api/${slug}/chapters?apiKey=${key}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setBooks();
          setChapters(data?.chapters);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <section className="space-y-3">
      {books &&
        books.map((book) => (
          <div key={book.id} className="bg-slate-900">
            <p onClick={() => handleClickBook(book.bookSlug)}>
              {book.bookName}
            </p>
          </div>
        ))}
      {chapters && (
        <>

          {chapters?.map((chapter) => (
            <div key={chapter.id} className="px-2 py-1 rounded-md bg-slate-900">
              <p onClick={null}>
                <span>{chapter.chapterNumber} - </span>
                {chapter.chapterArabic}
              </p>
              <p dir="ltr">
                <span>{chapter.chapterNumber} - </span>
                {chapter.chapterEnglish}
              </p>
            </div>
          ))}
        </>
      )}
    </section>
  );
};
