from newspaper import Article, Source
import newspaper
from urllib.parse import urlparse
import logging

logger = logging.getLogger(__name__)


BAD_CONTENT_MARKERS = [
    "support our journalism",
    "our mission",
    "newsletter signup",
    "log in to hide",
    "join us once again",
    "privacy policy",
    "advertisement",
    "conferences",
    "partner with",
    "thank you for your support",
    "how relevant is this ad to you?"
]

def is_bad_article(text: str) -> bool:
    if len(text.strip()) < 200:
        return True
    lowered = text.lower()
    return any(marker in lowered for marker in BAD_CONTENT_MARKERS)

def extract_article_text(url: str) -> tuple[str, str] | None:
    try:
        article = Article(url)
        article.download()
        article.parse()
        text = article.text.strip()

        if is_bad_article(text):
            logger.info(f"Filtered out likely non-article content from {url}")
            return None

        domain = urlparse(url).netloc
        return text, domain

    except Exception as e:
        logger.warning(f"Failed to extract article from {url}: {e}")
        return None
    
def extract_popular_urls(number_of_articles: int) -> list[tuple[str, str]]:
    popular_urls = newspaper.popular_urls()

    extracted = []
    for url in popular_urls:
        if len(extracted) >= number_of_articles:
            break
        result = extract_article_text(url)
        if result and len(result[0]) > 10:
            print(url, result[0])
            extracted.append(result)

    return extracted


# def extract_feed_urls(source_url: str) -> list[tuple[str, str]]:
#     paper = newspaper.build(source_url)
#     return [extract_article_text(a) for a in paper.feed_urls()]


# def extract_articles_from_source(source: Source) -> list[str]:
#     articles = []

#     for article in source.articles:
#         article_text, _ = extract_article_text(article.url)
#         articles.append(article_text)

#     return articles