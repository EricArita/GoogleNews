import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, FlatList } from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';
import {styles} from "./style"

export default function App() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

  const getNews = async () => {
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=04732dfe751a433781b87ce59845193e'
    );

    const jsonData = await response.json();
    //const newArticleList = filterForUniqueArticles(articles.concat(jsonData.articles));
    setArticles(jsonData.articles);
    setPageNumber(pageNumber + 1);
    setLoading(false);
  };
  
  useEffect(() => {
    getNews();
  }, []);

  const renderArticleItem = ({ item }) => {
    return (
      <Card title={item.title} image={{uri: item.urlToImage}}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={{marginBottom: 10}}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" loading={loading}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Articles Count:</Text>
        <Text style={styles.info}>{articles.length}</Text>
      </View>
      <FlatList
          data={articles}
          onEndReached={getNews} 
          onEndReachedThreshold={1}
          renderItem={renderArticleItem}
          keyExtractor={item => item.title}        
      />
    </View>
  );
}


