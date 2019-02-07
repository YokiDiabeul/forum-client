export class HtmlFormater {

  constructor(private html: string) {
  }

  replaceAll(match: any, replace: string): HtmlFormater {
    let newHtml = this.html.replace(match, replace);
    while (this.html !== newHtml) {
      this.html = newHtml;
      newHtml = this.html.replace(match, replace);
    }
    return this;
  }

  lead(): HtmlFormater {
    const newHtml = this.html.replace('<h1>', '<p class="lead">').replace('</h1>', '</p><div id="post-content">');
    if (newHtml !== this.html) {
      this.html = newHtml.concat('</div>');
    }
    this.html = newHtml;
    return this;
  }

  blockQuote(): HtmlFormater {
    const reg: RegExp = new RegExp('[^>]<\/blockquote>');

    return this.replaceAll('<blockquote>', '<blockquote class="blockquote"><p class="text-sm">')
      .replaceAll(reg, '</p></blockquote>');
  }

  code(): HtmlFormater {
    return this.replaceAll('<sub', '<code')
      .replaceAll('</sub', '</code');
  }

  small(): HtmlFormater {
    return this.replaceAll('ql-size-small', 'text-sm');
  }

  img(): HtmlFormater {
    return this.replaceAll('<img src', '<img class="img-fluid" src');
  }

  build(): string {
    return this.html;
  }
}
