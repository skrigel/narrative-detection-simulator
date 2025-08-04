from newspaper import Article, Source
import newspaper
from urllib.parse import urlparse

def extract_article_text(url: str) -> tuple[str, str]:
    article = Article(url)
    article.download()
    article.parse()
    text = article.text
    domain = urlparse(url).netloc
    return text, domain


def extract_popular_urls(number_of_articles: int) -> list[Source]:
    popular_urls = newspaper.popular_urls()[:number_of_articles]
    sources = [newspaper.build(url) for url in popular_urls]
    return sources


def extract_articles_from_source(source: Source) -> list[str]:
    articles = []

    for article in source.articles:
        article_text, _ = extract_article_text(article.url)
        articles.append(article_text)

    return articles


def extract_feed_urls(source_url: str) -> list[str]:
    paper = newspaper.build(source_url)

    return [a for a in paper.feed_urls()]

