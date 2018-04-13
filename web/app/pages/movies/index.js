import ATV from 'atvjs';
import template from './template.hbs';

import staticData from 'lib/static-data-generator';

var MoviesPage = ATV.Page.create({
	name: 'movies',
	data(data) { return data[1]; },
    template: (data) => {
        const categories = data.categories.map(category => {
            const media = category.media.map(type => {
                const streamSrc = `http://usa.iptv.stream.jw.org${type.source}`;
                const imgSrc = `http://usa.iptv.stream.jw.org${type.image_source}`;
                return `
                <lockup data-href-page="play" data-href-page-options='"${streamSrc}"'>
                    <img class="tile_compact" src="${imgSrc}"/>
                    <title class="showAndScrollTextOnHighlight">${type.title}</title>
                </lockup>`;
            }).reduce((strMedia, item) => strMedia + item, "");
            return `<listItemLockup>
                <title class="scrollTextOnHighlight">${category.name}</title>
                <relatedContent>
                    <grid>
                        <section>
                            ${media}
                        </section>
                    </grid>
                </relatedContent>
            </listItemLockup>`;
        }).reduce((strCategories, category) => strCategories + category, "");
		return `
		<document>
			<catalogTemplate theme="light">
				<banner>
					<title>${data.name}</title>
				</banner>
				<list>
					<section>
						${categories}
					</section>
				</list>
			</catalogTemplate>
		</document>`;
    },
	url: 'http://usa.iptv.stream.jw.org/api/v1/category?locale=en',
});

export default MoviesPage;